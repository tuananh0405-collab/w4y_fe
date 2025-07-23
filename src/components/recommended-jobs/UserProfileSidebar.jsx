import React from "react";
import { useGetApplicantProfileQuery } from "../../redux/api/applicantApiSlice";
import { Avatar, Skeleton, Tooltip, Typography } from "@mui/material";
import { ReportProblem } from "@mui/icons-material";
import { useGetJobSkillsByIdsQuery } from "../../redux/api/jobSkillApiSlice";
import check from "check-types";

const UserProfileSidebar = () => {
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    error: errorProfile,
  } = useGetApplicantProfileQuery();

  const profile = profileData?.data;

  const {
    data: skillsData,
    isLoading: isLoadingSkills,
    error: errorSkills,
  } = useGetJobSkillsByIdsQuery(
    { ids: profile?.skillIds },
    { skip: !check.nonEmptyArray(profile?.skillIds) },
  );

  const skills = skillsData?.data || [];

  if (isLoadingProfile) {
    return (
      <div className="w-full lg:w-96 bg-white rounded-2xl p-8 space-y-4">
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          className="mx-auto"
        />
        <Skeleton variant="text" width="80%" className="mx-auto" />
        <Skeleton variant="text" width="60%" className="mx-auto" />
        <Skeleton variant="rectangular" width="100%" height={200} />
      </div>
    );
  }

  if (errorProfile || !profile) {
    return (
      <div className="w-full lg:w-96 bg-red-100 rounded-2xl p-8 flex flex-col items-center justify-center text-red-600">
        <ReportProblem sx={{ fontSize: 48 }} />
        <Typography>Could not load profile</Typography>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-96 bg-white rounded-2xl p-8 self-start shadow-sm">
      <div className="flex flex-col items-center gap-4 mb-8">
        <Avatar
          alt={profile.name || "User"}
          src={profile.avatarUrl || ""}
          sx={{ width: 120, height: 120, bgcolor: "#d9d9d9" }}
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {profile.name || "Chưa có tên"}
          </h1>
          <h2 className="text-md text-gray-500">
            {profile.jobTitle || "Chưa có chức danh"}
          </h2>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Thông tin liên hệ</h3>
        <div className="h-px bg-gray-300 my-4"></div>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {profile.email || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Điện thoại:</span>{" "}
            {profile.phone || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Địa chỉ:</span>{" "}
            {profile.city || profile.district
              ? `${profile.district || ""}, ${profile.city || ""}`
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Kỹ năng</h3>
        <div className="h-px bg-gray-300 my-4"></div>
        {isLoadingSkills
          ? (
            <div className="flex flex-wrap gap-2">
              <Skeleton
                variant="rectangular"
                width={80}
                height={30}
                sx={{ borderRadius: 16 }}
              />
              <Skeleton
                variant="rectangular"
                width={120}
                height={30}
                sx={{ borderRadius: 16 }}
              />
            </div>
          )
          : errorSkills
            ? <p className="text-red-500 text-sm">Lỗi khi tải kỹ năng.</p>
            : skills.length > 0
              ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Tooltip title={skill.description} key={skill._id}>
                      <div className="flex items-center px-3 py-1 rounded-full select-none bg-gray-200 text-sm">
                        {skill.name}
                      </div>
                    </Tooltip>
                  ))}
                </div>
              )
              : <p className="text-gray-500 text-sm">Chưa có kỹ năng.</p>}
      </div>
    </div>
  );
};

export default UserProfileSidebar;
