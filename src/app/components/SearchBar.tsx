"use client"

import React, {useState} from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdLocationSearching } from "react-icons/md";

interface SearchBarProps {
    onLocationUpdate: (city: string, country: string) => void;
  }
  
const SearchBar: React.FC<SearchBarProps> = ({ onLocationUpdate }) => {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFindRestaurants = () => {
    onLocationUpdate(inputValue);
  };


  // user location update
  const handleShareLocation = () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Here, we'll fetch the location data using the Google Geocoding API
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
          );

          const data = await response.json();

          if (data.results.length > 0) {
            const addressComponents = data.results[0].address_components;

            // Extract city and country from the address components
            const city = addressComponents.find((component) =>
              component.types.includes("locality")
            )?.long_name;

            const country = addressComponents.find((component) =>
              component.types.includes("country")
            )?.long_name;

            // update user location
            if (city && country) {
              onLocationUpdate(city, country);
            }
          }
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex items-center bg-black p-3 rounded w-full max-w-3xl mx-auto">
      <div className="flex items-center bg-white text-gray-600 px-4 py-2  rounded flex-grow">
        <span className="material-icons text-gray-400">
          <CiLocationOn />
        </span>
        <input
          type="text"
          placeholder="Enter Delivery Address"
          value={inputValue}
          onChange={handleInputChange}
          className="flex-grow bg-transparent w-40 focus:outline-none ml-2"
        />

        <button
          onClick={handleShareLocation}
          className="flex items-center text-gray-600 bg-white rounded-full mx-2"
        >
          <span className="material-icons">
            <MdLocationSearching />
          </span>
          <span className="ml-2">Share Location</span>
        </button>
      </div>
      
      <button onClick={handleFindRestaurants} className="bg-green-500 text-white px-6 py-2 ml-3 rounded-full">
        Find Restaurants
      </button>
    </div>
  );
};

export default SearchBar;
