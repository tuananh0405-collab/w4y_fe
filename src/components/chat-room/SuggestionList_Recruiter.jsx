import { CircularProgress } from "@mui/material";
import SuggestionListItem from "./SuggestionListItem";
import { useGetApplicantsGroupedByApplicationsQuery } from "../../redux/api/chatApiSlice";

// For Recruiters
// List of applicants who applied to to an active job
const RecruiterSuggestionList = ({ userId, onSelect }) => {
  const { data: jobApplicantsListQuery, error: fetchError, isLoading: isFetchingList } = useGetApplicantsGroupedByApplicationsQuery({ recruiterId: userId });
  const { data: jobApplicantsList } = jobApplicantsListQuery ?? { data: [] }

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
      {jobApplicantsList.map((jobApplicantsRecord) =>
        <SuggestionListItem
          key={jobApplicantsRecord.applicant._id}
          id={jobApplicantsRecord.applicant._id}
          name={jobApplicantsRecord.applicant.name}
          email={jobApplicantsRecord.applicant.email}
          descriptionsLabel={`Vị trí đã ứng tuyển:`}
          descriptionsStack={jobApplicantsRecord.applications.map((application, index) => `${index + 1}: ${application.job.title}, trạng thái: ${application.applicationStatus}`)}
          onSelect={onSelect}
        />
      )}
    </div>
  );
};

export default RecruiterSuggestionList;
