import { CircularProgress, Stack } from "@mui/material";
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
      <div className="grow flex flex-row justify-center w-full bg-blue-100">
        <CircularProgress />
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="grow flex flex-row justify-center w-full bg-blue-100">
        {JSON.stringify(fetchError)}
      </div>
    )
  }

  return (
    <div className="grow flex flex-col gap-2 p-4 bg-red-200 overflow-auto">
      <Stack>
        {recruiterJobsList.map((recruiterJobsRecord) =>
          <SuggestionListItem
            id={recruiterJobsRecord.recruiter.id}
            name={recruiterJobsRecord.recruiter.name}
            email={recruiterJobsRecord.recruiter.email}
            descriptionsLabel={`Position${(recruiterJobsRecord.jobs.length > 1) ? "s" : ""} you applied`}
            descriptionsStack={recruiterJobsRecord.jobs.map((jobRecord) => `Title: ${jobRecord.job.title}, statue: ${jobRecord.applicationStatus}`)}
            onSelect={onSelect}
          />
        )}
      </Stack>
    </div>
  );
};

export default ApplicantSuggestionList;
