import React from "react";

const JobCard = ({
  title,
  author: employerName,
  description,
  location,
   deliveryTime,
   salary,
  link,
}) => {
  const content = (
    <>
      <h2 className="font-extrabold text-2xl mb-2 leading-tight">{title}</h2>
      <p className="font-light text-xl mb-2">{employerName}</p>
      <p className="font-normal text-lg mb-4 max-w-[590px]">{description}</p>
      <div className="flex items-center max-w-[590px] w-full gap-4">
        <div className="bg-green-200 rounded-lg h-[5px] w-[80px] flex-shrink-0"></div>

        <div className="bg-green-200 rounded-lg inline-flex items-center gap-4 px-4 py-1 h-10 flex-grow">
          <span className="font-bold text-sm whitespace-nowrap">{location}</span>
          <div className="w-[2px] h-[20px] bg-black"></div>
          <span className="font-bold text-sm whitespace-nowrap">{}</span>
          <div className="w-[2px] h-[20px] bg-black"></div>
          <span className="font-bold text-sm whitespace-nowrap">{salary}</span>
        </div>

        <div className="bg-green-200 rounded-lg h-[5px] w-[80px] flex-shrink-0"></div>
      </div>
    </>
  );

  return (
    <article className="bg-white rounded-lg shadow-md p-[25px_33px] box-border text-black max-w-[646px] w-full cursor-pointer">
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-inherit block"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </article>
  );
};

export default JobCard;
