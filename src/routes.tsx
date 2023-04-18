import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { loader as authenticationLoader } from "./pages/layouts/authentication";
import Login, { action as loginAction } from "./pages/login";

import axios from "axios";

import AdminDashboard, {
  loader as adminDashboardLoader,
} from "./pages/admin/dashboard";
import AdminLayout, { loader as adminLoader } from "./pages/layouts/admin";
import AuthenticationLayout from "./pages/layouts/authentication";
import ReceivePassword, {
  action as receivePasswordAction,
} from "./pages/receive-password";
import Setup from "./pages/setup";
import Welcome from "./pages/welcome";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }
  config.baseURL = "/api";
  return config;
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={<AuthenticationLayout />}
        loader={authenticationLoader}
      >
        <Route index element={<Welcome />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/login" element={<Login />} action={loginAction} />
        <Route
          path="/receive-password"
          element={<ReceivePassword />}
          action={receivePasswordAction}
        />
      </Route>
      <Route path="/admin/" element={<AdminLayout />} loader={adminLoader}>
        <Route
          index
          element={<AdminDashboard />}
          loader={adminDashboardLoader}
        />
      </Route>
    </Route>
  )
);

export const ApplicationRoutes = () => {
  return <RouterProvider router={router} />;
};
