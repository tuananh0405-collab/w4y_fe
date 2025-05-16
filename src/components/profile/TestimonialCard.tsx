import React from 'react';

const TestimonialCard = ({
  name = "Đặng Vũ Hiệp",
  designation = "Senior UI/UX Designer",
  rating = 4,
  description = "Lorem ipsum dolor sit amet consectetur. Dignissim orci etiam purus dui enim. Id bibendum mauris praesent porttitor dui amet elementum a quis. Ipsum nibh ornare augue vitae in nisl. Nam eu non sit lobortis ultricies enim et gravida. Condimentum integer integer nec ultricies lorem. Neque eu eget condimentum cras in tristique egestas. Molestie egestas nisl at morbi interdum lectus magna. Nec at nisl sed massa habitasse.\nOrci adipiscing ornare augue nec dui tincidunt ac. In nullam purus nisi libero ac orci. Senectus aliquam lorem diam in. Id arcu sit fermentum viverra nibh vehicula enim sagittis. Ipsum arcu vulputate nisl elit pulvinar ut at eget. Mattis eu a ultrices dictum venenatis. Nulla pulvinar ultricies interdum id ultricies fermentum lacus arcu. Velit cum sem tristique et purus libero. In cras suspendisse tristique arcu ullamcorper. Neque donec dis et amet felis. Faucibus mattis dui nunc orci ullamcorper pretium vitae. Ornare venenatis diam gravida nibh sit consectetur.\nHendrerit sit vulputate vitae libero quis lectus elementum euismod. Mauris tellus interdum sed aliquet pharetra ullamcorper diam tellus. Adipiscing.",
  avatarSrc = "https://dashboard.codeparrot.ai/api/image/Z9zDwZIdzXb5Olpw/ellipse.png"
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-300 p-8 flex flex-col gap-8 w-full max-w-[1296px]">
      <div className="flex items-center gap-7">
        <img src={avatarSrc} alt="User avatar" className="w-22 h-22 rounded-full" />
        <div className="flex flex-col gap-2">
          <h6 className="font-bold text-xl">{name}</h6>
          <p className="text-base">{designation}</p>
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className={`text-yellow-500 ${index < rating ? 'fas fa-star' : 'far fa-star'}`}></span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-base leading-relaxed">{description}</p>
    </div>
  );
};

export default TestimonialCard;
