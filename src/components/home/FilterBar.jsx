import React, { useState } from 'react';

const FilterBar = () => {
  const [selectedLocation, setSelectedLocation] = useState('');

  const locations = [
    { id: 'random', label: 'Ngẫu nhiên' },
    { id: 'hanoi', label: 'Hà Nội' },
    { id: 'hcm', label: 'TP Hồ Chí Minh' },
    { id: 'north', label: 'Miền Bắc' },
    { id: 'south', label: 'Miền Nam' }
  ];

  const handleLocationSelect = (locationId) => {
    setSelectedLocation(locationId);
  };

  return (
    <div className="flex items-center gap-8 p-4 bg-transparent">
      <div className="flex items-center bg-orange-500 p-3 rounded-md gap-4">
        <span className="text-white font-semibold">Lọc theo:</span>
        <span className="text-white font-semibold">Địa điểm</span>
        <span className="text-white text-xs">▼</span>
      </div>
      <div className="flex gap-4">
        {locations.map((location) => (
          <button
            key={location.id}
            className={`h-12 px-6 rounded-lg font-semibold ${selectedLocation === location.id ? 'bg-orange-500 text-white' : 'bg-transparent border border-gray-300'}`}
            onClick={() => handleLocationSelect(location.id)}
          >
            {location.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
