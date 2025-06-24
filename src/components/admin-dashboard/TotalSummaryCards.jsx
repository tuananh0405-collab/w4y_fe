import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";

import {
  useGetTotalUserCountQuery,
  useGetApplicantRecruiterCountQuery,
} from "../../redux/api/userApiSlice";
import { useGetJobOverviewQuery } from "../../redux/api/jobApiSlice";

const StatCard = ({ label, value, icon, loading }) => (
  <Paper
    sx={{
      p: 2,
      display: "flex",
      alignItems: "center",
      gap: 2,
      minWidth: 200,
      flex: 1,
    }}
  >
    <Box sx={{ fontSize: 32 }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle2" color="textSecondary">
        {label}
      </Typography>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <Typography variant="h6">{value}</Typography>
      )}
    </Box>
  </Paper>
);

const TotalSummaryCards = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: totalUserData, isLoading: loadingTotal } = useGetTotalUserCountQuery();
  const { data: roleCountData, isLoading: loadingRoles } = useGetApplicantRecruiterCountQuery();
  const { data: jobOverviewData, isLoading: loadingOverview } = useGetJobOverviewQuery();

  const totalUsers = totalUserData?.total || 0;
  const applicants = roleCountData?.applicant || 0;
  const recruiters = roleCountData?.recruiter || 0;
  const currentActiveJob = jobOverviewData?.data?.statistics?.activeJobs ?? 0;

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={3}
      useFlexGap
      flexWrap="wrap"
      justifyContent="space-between"
    >
      <StatCard
        label="Total Users"
        value={totalUsers}
        icon={<PeopleIcon />}
        loading={loadingTotal}
      />
      <StatCard
        label="Applicants"
        value={applicants}
        icon={<PersonIcon />}
        loading={loadingRoles}
      />
      <StatCard
        label="Recruiters"
        value={recruiters}
        icon={<BusinessIcon />}
        loading={loadingRoles}
      />
      <StatCard
        label="Active Jobs"
        value={currentActiveJob}
        icon={<WorkIcon />}
        loading={loadingOverview}
      />
    </Stack>
  );
};

export default TotalSummaryCards;
