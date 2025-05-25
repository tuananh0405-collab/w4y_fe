import React from "react";

const JobCard = ({ title, date, views, cvs }) => (
  <article className="bg-teal-800 rounded-md p-3 text-white">
    <h3 className="text-xl font-bold mb-1">{title}</h3>
    <div className="flex justify-between font-semibold text-lg">
      <span>Đăng: {date}</span>
      <span>Lượt xem: {views}</span>
      <span>CV: {cvs}</span>
    </div>
  </article>
);

const ExpiringJobCard = ({ title, daysLeft }) => (
  <article className="bg-teal-200 rounded-md p-3 text-center">
    <h4 className="text-lg font-bold text-black mb-1">{title}</h4>
    <p className="text-base font-bold text-teal-800">Còn {daysLeft} ngày</p>
  </article>
);

const DashboardTab = () => {
  return (
    <section className="max-w-4xl mx-auto p-4 bg-white rounded-xl font-inter">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Bảng điều khiển</h1>
      </header>

      {/* Stats */}
      <section className="flex justify-between gap-4 mb-8">
        <div className="flex-1 border-2 border-gray-400 rounded-md p-4 text-center">
          <p className="text-base font-normal mb-2">Tin tuyển dụng hiện tại</p>
          <p className="text-4xl font-bold">10</p>
        </div>
        <div className="flex-1 border-2 border-gray-400 rounded-md p-4 text-center">
          <p className="text-base font-normal mb-2">Lượt xem tin tuyển dụng</p>
          <p className="text-4xl font-bold">125</p>
        </div>
        <div className="flex-1 border-2 border-gray-400 rounded-md p-4 text-center">
          <p className="text-base font-normal mb-2">Ứng viên ứng tuyển</p>
          <p className="text-4xl font-bold">36</p>
        </div>
      </section>

      {/* Content */}
      <main className="flex gap-6">
        {/* Recent Jobs */}
        <section className="flex-1">
          <h2 className="text-xl font-bold mb-3">Tin tuyển dụng gần đây</h2>
          <div className="border-2 border-gray-400 rounded-md p-3 flex flex-col gap-3">
            <JobCard title="Junior Design UX/UI" date="02/05/2025" views={36} cvs={36} />
            <JobCard title="Junior Design UX/UI" date="02/05/2025" views={36} cvs={36} />
            <JobCard title="Junior Design UX/UI" date="02/05/2025" views={36} cvs={36} />
          </div>
        </section>

        {/* Expiring Jobs */}
        <section className="flex-1">
          <h2 className="text-xl font-bold mb-3">Sắp hết hạn</h2>
          <div className="border-2 border-gray-400 rounded-md p-3 flex flex-col gap-4">
            <ExpiringJobCard title="Frontend Developer" daysLeft={3} />
            <ExpiringJobCard title="Design Web" daysLeft={2} />
          </div>
        </section>
      </main>
    </section>
  );
};

export default DashboardTab;
