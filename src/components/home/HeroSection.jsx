import React, { useState } from 'react';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative w-full h-[619px] overflow-hidden bg-transparent">
      <img src="https://dashboard.codeparrot.ai/api/image/Z9fvHSppvFKitUQv/1440-x-691.png" alt="Hero background" className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-white text-4xl font-bold text-center mb-10">TÌM VIỆC NHANH HƠN<br />TẠI W4U</h1>
        <form className="flex items-center w-full max-w-lg relative" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Tìm Kiếm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 rounded-full bg-white pr-12 pl-4"
          />
          <button type="submit" className="absolute right-0 w-12 h-12 flex items-center justify-center">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9fvHSppvFKitUQv/vector.png" alt="Search" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
