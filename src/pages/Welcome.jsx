import React from 'react'

const Welcome = () => {
  return (
    <div className="max-w-[1440px] mx-auto p-5 font-['Inter']">
    <div className="text-center mb-10">
      <h1 className="text-[40px] font-bold text-[#151515] mb-5">
      Chào bạn,
      </h1>
      <p className="text-xl font-light text-[#151515] mb-5">
      Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé !
      </p>
      <hr className="border-black my-5 w-full" />
      <p className="text-2xl font-medium text-[#151515] mb-10">
      Để tối ưu tốt nhất cho trải nghiệm của bạn với W4U, vui lòng lựa chọn nhóm phù hợp với bạn
      </p>
    </div>

    <div className="flex justify-around items-center mt-5">
      <div className="flex flex-col items-center gap-5">
        <div className="w-[420px] h-[420px] bg-[#f2d49b] rounded-[29px] overflow-hidden flex justify-center items-center">
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z9fmoyppvFKitUQd/1-1.png" 
            alt="Recruiter" 
            className="max-w-full h-auto object-cover"
          />
        </div>
        <button 
          className="w-[310px] h-[61px] bg-[#f2762e] rounded-[30.5px] text-white text-2xl font-medium 
                     hover:bg-[#d65f1f] active:scale-[0.98] transition-all duration-300"
          onClick={() => console.log('Recruiter selected')}
        >
          Tôi là nhà tuyển dụng
        </button>
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="w-[420px] h-[420px] bg-[#f2d49b] rounded-[29px] overflow-hidden flex justify-center items-center">
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z9fmoyppvFKitUQd/2-1.png" 
            alt="Job Seeker" 
            className="max-w-full h-auto object-cover"
          />
        </div>
        <button 
          className="w-[310px] h-[61px] bg-[#f2762e] rounded-[30.5px] text-white text-2xl font-medium 
                     hover:bg-[#d65f1f] active:scale-[0.98] transition-all duration-300"
          onClick={() => console.log('Job seeker selected')}
        >
          Tôi là ứng viên tìm việc
        </button>
      </div>
    </div>
  </div>
  )
}

export default Welcome
