import { CircularProgress } from "@mui/material";
import SuggestionListItem from "./SuggestionListItem";
import { useGetRecruitersGroupedByApplicationsQuery } from "../../redux/api/chatApiSlice";

// For Applicants
// List of recruiters whose jobs the applicant applied to
// List of recruiters of recommended jobs (TODO)
const ApplicantSuggestionList = ({ userId, onSelect }) => {
  const { data: recruiterJobsListQuery, error: fetchError, isLoading: isFetchingList } = useGetRecruitersGroupedByApplicationsQuery({ applicantId: userId });
  const { data: recruiterJobsList } = recruiterJobsListQuery ?? { data: [] }

  if (isFetchingList) {
    return (
      <div className="grow flex flex-row justify-center w-full">
        <CircularProgress />
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="grow flex flex-row justify-center w-full">
        {JSON.stringify(fetchError)}
      </div>
    )
  }

  return (
    <div className="grow flex flex-col gap-4 overflow-auto">
      {recruiterJobsList.map((recruiterJobsRecord) =>
        <SuggestionListItem
          key={recruiterJobsRecord.recruiter._id}
          id={recruiterJobsRecord.recruiter._id}
          name={recruiterJobsRecord.recruiter.name}
          email={recruiterJobsRecord.recruiter.email}
          descriptionsLabel={`Vị trí đã ứng tuyển:`}
          descriptionsStack={recruiterJobsRecord.jobs.map((jobRecord, index) => `${index + 1}: ${jobRecord.job.title}, trạng thái: ${jobRecord.applicationStatus}`)}
          onSelect={onSelect}
        />
      )}
    </div>
  );
};

export default ApplicantSuggestionList;
