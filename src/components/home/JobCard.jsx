const JobCard = ({
  title,
  author: employerName,
  description,
  location,
  deliveryTime,
  experience,
  salary,
  link,
}) => {
  const content = (
    <>
      <h2
        className="font-extrabold text-2xl mb-2 leading-tight max-w-full break-words"
        style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
      >
        {title}
      </h2>
      <p className="font-light text-xl mb-2 max-w-full truncate">{employerName}</p>
      <p
        className="font-normal text-lg mb-4 max-w-[590px] break-words"
        style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
      >
        {description}
      </p>
      <div className="flex items-center max-w-[590px] w-full gap-4">
        <div className="bg-green-200 rounded-lg h-[5px] w-[80px] flex-shrink-0"></div>

        <div
          className="bg-green-200 rounded-lg inline-flex items-center gap-4 px-4 py-1 h-10"
          style={{ flexShrink: 1, flexGrow: 0, minWidth: 0 }}
        >
          {/* Cho phép mỗi phần text tự co giãn, tránh tràn */}
          <span className="font-bold text-sm whitespace-nowrap truncate max-w-[150px]" title={location}>
            {location}
          </span>
          <div className="w-[2px] h-[20px] bg-black"></div>
          <span className="font-bold text-sm whitespace-nowrap truncate max-w-[150px]" title={experience}>
            {experience}
          </span>
          <div className="w-[2px] h-[20px] bg-black"></div>
          <span className="font-bold text-sm whitespace-nowrap truncate max-w-[150px]" title={salary}>
            {salary}
          </span>
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
