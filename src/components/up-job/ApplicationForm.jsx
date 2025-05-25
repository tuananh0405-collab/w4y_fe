import React from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { fileIcon, editNoteIcon,checkedIcon } from "../../assets";
const ApplicationForm = () => {
  return (
    <main className="flex justify-center p-8 bg-[#d7f3ea] font-sans">
      <section className="bg-[#d7f3ea] rounded-3xl p-8 max-w-xl w-full">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-center">Ứng tuyển [Tên công việc]</h1>
        </header>

        {/* Chọn CV */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <img src={fileIcon} alt="" className="w-6 h-6" />
            Chọn CV:
          </h2>
          <div className="flex flex-col gap-2 border border-gray-300 rounded-md p-4 pl-8">
            <label className="flex items-center gap-2 text-lg font-normal cursor-pointer">
              <Checkbox
                checked
                color="default"
                size="medium"
                sx={{ padding: 0, margin: 0 }}
              />
              <img src={checkedIcon} alt="" className="w-5 h-5" />
              <span>Chọn CV từ thư viện của tôi</span>
            </label>

            <label className="flex items-center gap-2 text-lg font-normal cursor-pointer">
              <Checkbox color="default" size="medium" sx={{ padding: 0, margin: 0 }} />
              <span>Tải CV từ máy tính(hỗ trợ docs, pdf)</span>
            </label>
          </div>
        </section>

        {/* Thư giới thiệu */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <span>Thư giới thiệu</span>
          </h2>
          <p className="text-gray-700 text-base mb-4 leading-relaxed">
            Một thư giới thiệu ngắn gọn, chỉnh chu sẽ giúp bạn trở nên chuyên nghiệp và gây ấn tượng với nhà tuyển dụng
          </p>
          <textarea
            placeholder='Viết giới thiệu ngắn gọn về bản thân(điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển cho vị trí này."'
            rows={4}
            className="w-full border border-[#6a9183] rounded-md p-4 text-base resize-y bg-white"
          />
        </section>

        {/* Lưu ý */}
        <section>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <img src={editNoteIcon} alt="" className="w-6 h-6" />
            Lưu ý
          </h2>
          <ol className="list-decimal pl-6 text-lg text-gray-700 space-y-3 leading-relaxed">
            <li>
              Chúng tôi khuyến nghị ứng viên cần chủ động tìm hiểu kỹ thông tin công ty, vị trí ứng tuyển và đảm bảo rằng tin tuyển dụng là minh bạch trước khi nộp hồ sơ.
            </li>
            <li>
              Ứng viên cần chịu trách nhiệm với các hành vi ứng tuyển của mình. Trong trường hợp bạn phát hiện tin tuyển dụng có dấu hiệu lừa đảo, hoặc nhận được liên hệ đáng ngờ từ phía nhà tuyển dụng, vui lòng báo cáo ngay cho đội ngũ hỗ trợ của chúng tôi qua email{" "}
              <strong>hotro@W4Uwebsite.vn</strong> để được xử lý kịp thời.
            </li>
            <li>
              Để tránh rủi ro, bạn nên tránh cung cấp các thông tin nhạy cảm như CMND/CCCD, tài khoản ngân hàng hoặc các loại phí cho đến khi chắc chắn về độ uy tín của bên tuyển dụng.
            </li>
            <li>
              Xem thêm hướng dẫn phòng tránh lừa đảo và mẹo tìm việc an toàn{" "}
              <a href="#" className="text-[#183c2e] underline">
                tại đây
              </a>
              .
            </li>
          </ol>
        </section>

        {/* Footer buttons */}
        <footer className="flex justify-end gap-4 mt-8">
          <Button variant="outlined" color="primary" className="min-w-[81px]" sx={{ color: "#3a6656", borderColor: "#3a6656" }}>
            Hủy
          </Button>
          <Button variant="contained" color="primary" className="min-w-[200px]" sx={{ backgroundColor: "#3a6656", color: "#fff" }}>
            Nộp hồ sơ ứng tuyển
          </Button>
        </footer>
      </section>
    </main>
  );
};

export default ApplicationForm;
