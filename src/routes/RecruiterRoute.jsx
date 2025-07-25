import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ApplicantRoute = ({ redirect = "/" }) => {
  const user = useSelector((state) => state.auth.userState);
  const accountType = user?.user?.accountType;

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  console.log(user);
  if (accountType !== "Nhà Tuyển Dụng") {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};

export default ApplicantRoute;
