import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./layouts/App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Auth from "./layouts/Auth.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import UserRoute from "./routes/UserRoute.jsx";
import Welcome from "./pages/Welcome.jsx";
import Error404 from "./utils/Error404.jsx";
import Register_Employer from "./pages/Register_Employer.jsx";
import Register_Employee from "./pages/Register_Employee.jsx";
import Home from "./pages/Home.jsx";
import UpCV from "./pages/UpCV.jsx";
import UpJob from "./pages/UpJob.jsx";
import Apply from "./pages/Apply.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import JobDetail from "./pages/JobDetail.jsx";
import Profile from "./pages/Profile.jsx";
import TopJobs from "./pages/TopJobs.jsx";
import GoogleCallback from "./components/auth/GoogleCallback.jsx";
import ProjectRoom from "./pages/ProjectRoom.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* AUTH  */}
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      {/* PRIVATE  */}
      <Route path="/admin" element={<App />}>
        <Route path="" element={<AdminRoute />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>
      </Route>
      {/* PUBLIC  */}
      <Route path="/" element={<App />}>
        <Route path="" element={<UserRoute />}>
          <Route path="/register-employer" element={<Register_Employer />} />
          <Route path="/register-employee" element={<Register_Employee />} />
          <Route path="/" element={<Home />} />
          <Route path="/up-cv" element={<UpCV />} />
          <Route path="/up-job" element={<UpJob />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/job-detail/:jobId" element={<JobDetail />} />
          <Route path="/top-jobs" element={<TopJobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/project-room" element={<ProjectRoom />} />
        </Route>
      </Route>
      {/* Route 404 cho tất cả các route khác */}
      <Route path="*" element={<Error404 />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
