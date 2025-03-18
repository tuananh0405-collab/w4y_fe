import React from 'react';
import { fsoftImage } from '../../assets';

const defaultCompanies = [
  {
    id: 1,
    name: 'FPT Software',
    logo: fsoftImage,
    skills: ['C++', 'English', 'Java', 'Android', '.Net']
  },
  {
    id: 2,
    name: 'ELCA',
    logo: fsoftImage,
    skills: ['C++', 'JavaScript', 'Java', 'SharePoint', '.Net']
  },
  {
    id: 3,
    name: 'MB Bank',
    logo: fsoftImage, 
    skills: ['Python', 'Oracle', 'Java', 'ReactJS', 'AngularJS']
  },
  {
    id: 4,
    name: 'VTC',
    logo: fsoftImage,
    skills: ['Design', 'Photoshop', 'AI', 'After Effect', 'InDesign']
  }
];

const CompanyCards = ({ companies = defaultCompanies }) => {
  return (
    <div className="flex flex-wrap gap-5 justify-center p-5 bg-transparent">
      {companies.map(company => (
        <div key={company.id} className="w-80 bg-white rounded-lg border-4 border-orange-500 p-5 flex flex-col items-center">
          <div className="w-56 h-56 flex items-center justify-center mb-5">
            <img src={company.logo} alt={`${company.name} logo`} className="max-w-full max-h-full object-contain" />
          </div>
          <h2 className="text-2xl font-extrabold mb-5">{company.name}</h2>
          <div className="flex flex-wrap gap-2 justify-center mb-5">
            {company.skills.map((skill, index) => (
              <span key={index} className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm">{skill}</span>
            ))}
          </div>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-md mt-auto">Xem thêm</button>
        </div>
      ))}
    </div>
  );
};

export default CompanyCards;
