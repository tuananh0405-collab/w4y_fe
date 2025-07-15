import React from "react";


import { companyLogoIcon, moneyCalculator24Icon } from "../../assets";

export const TopJobCard = ({ jobs }) => {
  return (
    <div className="flex flex-col gap-6">
      {jobs.map((job, idx) => (
        <div
          key={idx}
          className="bg-[#d7f0e6] rounded-xl shadow-sm p-6 flex items-center gap-6 hover:shadow-md transition-shadow duration-300"
        >
          <img
            src={companyLogoIcon}
            alt="Company Logo"
            className="w-28 h-28 object-contain rounded-lg bg-white p-2"
          />
          <div className="flex-1 flex flex-col justify-between min-h-[112px]">
            <div>
              <h3 className="text-[#034d31] font-semibold text-xl leading-tight">
                {job.title}
              </h3>
              <p className="text-[#034d31cc] font-medium text-sm mt-1">
                {job.description.length > 150
                  ? job.description.slice(0, 147) + "..."
                  : job.description}
              </p>
            </div>
            <div className="flex gap-3 mt-4">
              <span className="bg-[#037a50] text-white text-xs rounded px-3 py-1 shadow-sm">
                {job.location}
              </span>
              <span className="bg-[#037a50] text-white text-xs rounded px-3 py-1 shadow-sm">
                {job.experience}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center text-[#034d31] font-semibold text-sm min-h-[112px]">
            <div className="flex flex-row justify-end items-center gap-2">
              <span>{job.salary}</span>
              <img
                src={moneyCalculator24Icon}
                alt="Salary"
                className="w-7 h-7"
              />
            </div>
            <span className="text-xs opacity-70 mt-auto">{job.postedTime}</span>
            <div className="flex items-center gap-1 text-green-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <span>{job.deliveryTime}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
