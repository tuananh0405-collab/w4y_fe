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
  // Giả sử bạn đang dùng font size 1.5rem (24px) cho title và line-height = 1.2 (cỡ 28.8px dòng)
  // Chiều cao tối thiểu cho 2 dòng title = 2 * 28.8px = 57.6px
  // Tương tự, description font size 1.125rem (18px), line-height 1.3 = 23.4px, 3 dòng là 70.2px

  return (
    <article className="bg-white rounded-lg shadow-md p-[25px_33px] box-border text-black max-w-[646px] w-full cursor-pointer">
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-inherit block"
        >
          <>
            <h2
              className="font-extrabold text-2xl mb-2 leading-tight max-w-full"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                minHeight: '58px', // đảm bảo luôn 2 dòng hiển thị
              }}
              title={title}
            >
              {title}
            </h2>
            <p
              className="font-light text-lg mb-2 max-w-full"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                minHeight: '70px', // đảm bảo luôn 3 dòng hiển thị
              }}
              title={description}
            >
              {description}
            </p>
            <p
              className="font-normal max-w-[590px]"
              style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
            >
              {employerName}
            </p>
            <div className="flex items-center max-w-[590px] w-full gap-4">
              <div className="bg-green-200 rounded-lg h-[5px] w-[80px] flex-shrink-0"></div>

              <div
                className="bg-green-200 rounded-lg inline-flex items-center gap-4 px-4 py-1 h-10"
                style={{ flexShrink: 1, flexGrow: 0, minWidth: 0 }}
              >
                <span
                  className="font-bold text-sm whitespace-nowrap truncate max-w-[150px]"
                  title={location}
                >
                  {location}
                </span>
                <div className="w-[2px] h-[20px] bg-black"></div>
                <span
                  className="font-bold text-sm whitespace-nowrap truncate max-w-[150px]"
                  title={experience}
                >
                  {experience}
                </span>
                <div className="w-[2px] h-[20px] bg-black"></div>
                <span
                  className="font-bold text-sm whitespace-nowrap truncate max-w-[150px]"
                  title={salary}
                >
                  {salary}
                </span>
              </div>

              <div className="bg-green-200 rounded-lg h-[5px] w-[80px] flex-shrink-0"></div>
            </div>
          </>
        </a>
      ) : (
        <>
          <h2
            className="font-extrabold text-2xl mb-2 leading-tight max-w-full"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              minHeight: '58px',
            }}
            title={title}
          >
            {title}
          </h2>
          <p
            className="font-light text-lg mb-2 max-w-full"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              minHeight: '70px',
            }}
            title={description}
          >
            {description}
          </p>
          <p
            className="font-normal max-w-[590px]"
            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
          >
            {employerName}
          </p>
          <div className="flex items-center max-w-[590px] w-full gap-4">
            <div className="bg-green-200 rounded-lg h-[5px] w-[80px] flex-shrink-0"></div>

            <div
              className="bg-green-200 rounded-lg inline-flex items-center gap-4 px-4 py-1 h-10"
              style={{ flexShrink: 1, flexGrow: 0, minWidth: 0 }}
            >
              <span
                className="font-bold text-sm whitespace-nowrap truncate max-w-[150px]"
                title={location}
              >
                {location}
              </span>
              <div className="w-[2px] h-[20px] bg-black"></div>
              <span
                className="font-bold text-sm whitespace-nowrap truncate max-w-[150px]"
                title={experience}
              >
                {experience}
              </span>
              <div className="w-[2px] h-[20px] bg-black"></div>
              <span
                className="font-bold text-sm whitespace-nowrap truncate max-w-[150px]"
                title={salary}
              >
                {salary}
              </span>
            </div>

            <div className="bg-green-200 rounded-lg h-[5px] w-[80px] flex-shrink-0"></div>
          </div>
        </>
      )}
    </article>
  );
};

export default JobCard;
