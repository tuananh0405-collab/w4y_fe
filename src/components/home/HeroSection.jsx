import React, { useState } from 'react';
import { heroImage } from '../../assets';
const HeroSection = () => {


  return (
    <div className="relative w-full h-[619px] overflow-hidden bg-transparent">
    <img src={heroImage} alt="Hero background" className="w-full h-full object-cover" />
    
    <div className="absolute inset-0 flex flex-col justify-center pt-30 pl-20">
      
      
     

      
    </div>
  </div>
  );
};

export default HeroSection;
