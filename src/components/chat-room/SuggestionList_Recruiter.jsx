import { CircularProgress, Stack } from "@mui/material";
import SuggestionListItem from "./SuggestionListItem";
import { useGetApplicantsGroupedByApplicationsQuery } from "../../redux/api/chatApiSlice";

// For Recruiters
// List of applicants who applied to to an active job
const RecruiterSuggestionList = ({ userId, onSelect }) => {
  const { data: jobApplicantsListQuery, error: fetchError, isLoading: isFetchingList } = useGetApplicantsGroupedByApplicationsQuery({ recruiterId: userId });
  const { data: jobApplicantsList } = jobApplicantsListQuery ?? { data: [] }

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
        {jobApplicantsList.map((jobApplicantsRecord) =>
          <SuggestionListItem
            id={jobApplicantsRecord.applicant._id}
            name={jobApplicantsRecord.applicant.name}
            email={jobApplicantsRecord.applicant.email}
            descriptionsLabel={`Position${(jobApplicantsRecord.applications.length > 1) ? "s" : ""} applied`}
            descriptionsStack={jobApplicantsRecord.applications.map((application) => `Title: ${application.job.title}, statue: ${application.applicationStatus}`)}
            onSelect={onSelect}
          />
        )}
      </Stack>
    </div>
  );
};

export default RecruiterSuggestionList;
