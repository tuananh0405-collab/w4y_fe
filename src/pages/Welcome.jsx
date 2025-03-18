import React from 'react'
import { employeeImage, employerImage } from '../assets'
// import employeeImg from '../assets/images/employee.png'
// import employerImg from '../assets/images/employer.png'

const Welcome = () => {
  return (
    <div className="max-w-[1440px] mx-auto p-5 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-5">
          Chào bạn,
        </h1>
        <p className="text-xl font-light text-gray-800 mb-5">
          Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé!
        </p>
        <hr className="border-black my-5 w-full" />
        <p className="text-2xl font-medium text-gray-800 mb-10">
          Để tối ưu tốt nhất cho trải nghiệm của bạn với W4U, vui lòng lựa chọn nhóm phù hợp với bạn
        </p>
      </div>

      <div className="flex justify-around items-center mt-5 gap-10">
        {/* Nhà tuyển dụng */}
        <div className="flex flex-col items-center gap-5">
          <div className="w-[420px] h-[420px] bg-[#f2d49b] rounded-[29px] overflow-hidden flex justify-center items-center">
            <img 
              src={employerImage}
              alt="Recruiter" 
              className="w-full h-auto object-cover"
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

        {/* Ứng viên tìm việc */}
        <div className="flex flex-col items-center gap-5">
          <div className="w-[420px] h-[420px] bg-[#f2d49b] rounded-[29px] overflow-hidden flex justify-center items-center">
            <img 
              src={employeeImage} 
              alt="Job Seeker" 
              className="w-full h-auto object-cover"
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
