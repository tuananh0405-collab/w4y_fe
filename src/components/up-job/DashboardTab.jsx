import React from "react";
import { useSelector } from "react-redux";
import { useGetApplicationsWithInfoQuery } from "../../redux/api/applicationApiSlice";
import { useGetJobsByEmployerQuery } from "../../redux/api/jobApiSlice";
import { format, differenceInDays, parseISO } from "date-fns";

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

const DashboardTab = ({ onSelectTab }) => {
  const user = useSelector((state) => state.auth.userState);
    const employerId = user?.user?.id;
   // Lấy danh sách job của employer
  const { data: jobsData, isLoading: isLoadingJobs, error: jobsError } = useGetJobsByEmployerQuery(employerId);

  // Lấy danh sách ứng tuyển cho các job
  const { data: applicationsData, isLoading: isLoadingApplications, error: applicationsError } = useGetApplicationsWithInfoQuery({ employerId });

  if (isLoadingJobs || isLoadingApplications) return <div>Loading...</div>;
  if (jobsError || applicationsError) return <div>Error loading data</div>;

  const jobs = jobsData?.data || [];
  const applications = applicationsData?.data || [];

  
  // Lọc ra các job đăng trong 7 ngày gần nhất
  const recentJobs = jobs.filter(job => {
    if (!job.createdAt) return false;
    const createdDate = parseISO(job.createdAt);
    const daysDiff = differenceInDays(new Date(), createdDate);
    return daysDiff <= 7;
  });

  // Giả sử job có deadline lưu trong trường 'deadline' kiểu ISO string, lọc job còn dưới 7 ngày
  const expiringJobs = jobs.filter(job => {
    if (!job.deadline) return false;
    const deadlineDate = parseISO(job.deadline);
    const daysLeft = differenceInDays(deadlineDate, new Date());
    return daysLeft >= 0 && daysLeft <= 7;
  });
  return (
    <section className="max-w-4xl mx-auto p-4 bg-white rounded-xl font-inter">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Bảng điều khiển</h1>
      </header>

      {/* Stats */}
      <section className="flex justify-between gap-4 mb-8">
        <div className="flex-1 border-2 border-gray-400 rounded-md p-4 text-center cursor-pointer"   onClick={() => onSelectTab(2)}>
          <p className="text-base font-normal mb-2">Tin tuyển dụng hiện tại</p>
          <p className="text-4xl font-bold">{jobs.length}</p>
        </div>
        {/*<div className="flex-1 border-2 border-gray-400 rounded-md p-4 text-center">
          <p className="text-base font-normal mb-2">Lượt xem tin tuyển dụng</p>
          <p className="text-4xl font-bold">125</p>
        </div>*/}
        <div className="flex-1 border-2 border-gray-400 rounded-md p-4 text-center cursor-pointer"   onClick={() => onSelectTab(3)}>
          <p className="text-base font-normal mb-2">Ứng viên ứng tuyển</p>
          <p className="text-4xl font-bold">{applications.length}</p>
        </div>
      </section>

      {/* Content */}
      <main className="flex gap-6">
        {/* Recent Jobs */}
        <section className="flex-1">
          <h2 className="text-xl font-bold mb-3">Tin tuyển dụng gần đây</h2>
          <div className="border-2 border-gray-400 rounded-md p-3 flex flex-col gap-3">
            {recentJobs.map(job => (
              <JobCard
                key={job._id}
                title={job.title}
                date={format(parseISO(job.createdAt), "dd/MM/yyyy")}
                views={job.views || 0}  // giả định có trường views
                cvs={job.applicationsCount || 0} // giả định có trường ứng viên đếm được
              />
            ))}
          </div>
        </section>

        {/* Expiring Jobs */}
        <section className="flex-1">
          <h2 className="text-xl font-bold mb-3">Sắp hết hạn</h2>
          <div className="border-2 border-gray-400 rounded-md p-3 flex flex-col gap-4">
           {expiringJobs.map(job => {
              const daysLeft = differenceInDays(parseISO(job.deadline), new Date());
              return (
                <ExpiringJobCard key={job._id} title={job.title} daysLeft={daysLeft} />
              );
            })}
          </div>
        </section>
      </main>
    </section>
  );
};

export default DashboardTab;
