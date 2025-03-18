import React, { useState } from 'react';
import { heroImage } from '../../assets';
import { Search } from '@mui/icons-material'; 
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative w-full h-[619px] overflow-hidden bg-transparent">
    <img src={heroImage} alt="Hero background" className="w-full h-full object-cover" />
    
    <div className="absolute inset-0 flex flex-col justify-center pt-30 pl-20">
      
      
      <form className="flex items-center w-md relative" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Tìm Kiếm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 rounded-full bg-white pl-4 pr-12 focus:outline-none"
        />
        <button type="submit" className="absolute right-0 w-12 h-12 flex items-center justify-center">
          <Search className="text-orange-500" /> {/* Material-UI search icon */}
        </button>
      </form>
    </div>
  </div>
  );
};

export default HeroSection;
