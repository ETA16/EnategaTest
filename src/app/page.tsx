"use client"

import React, { useState } from 'react';
import MapComponent from './components/MapComponents';
import SearchBar from './components/SearchBar';

const Home: React.FC = () => {
  const [mapLocation, setMapLocation] = useState('');

  const handleLocationSelect = (location: string) => {
    setMapLocation(location);
  };

  return (
    <main className="relative flex flex-col items-center justify-center h-screen">
      <MapComponent location={mapLocation} />
      <div className="absolute inset-0 flex items-center justify-center">
        <SearchBar onLocationSelect={handleLocationSelect} />
      </div>
    </main>

  );
};

export default Home;
