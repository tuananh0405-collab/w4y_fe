import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ApplicantRoute = ({ redirect = "/", allowGuest = false }) => {
  const user = useSelector((state) => state.auth.userState);
  const accountType = user?.user?.accountType;

  if (!user) {
    if (allowGuest) {
      return <Outlet />;
    }
    return <Navigate to={redirect} replace />;
  }

  if (accountType !== "Nhà Tuyển Dụng") {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};

export default ApplicantRoute;
