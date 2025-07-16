import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { userState } = useSelector((state) => state.auth);

  if (!userState) {
    return <Navigate to="/admin/auth" replace />;
  }

  if (userState.accountType !== "Admin") {
    return <Navigate to="/admin/auth" replace />;
  }

  return <Outlet/>

};

export default AdminRoute;
