import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Authentication, {
  loader as authenticationLoader,
} from "./pages/layouts/authentication";
import Login, { action as loginAction } from "./pages/login";

import axios from "axios";
import Protected from "./pages/protected";
import ReceivePassword, {
  action as receivePasswordAction,
} from "./pages/receive-password";
import Setup from "./pages/setup";
import Welcome from "./pages/welcome";
import {
  AbilityProvider,
  getAbilityFromToken,
} from "./providers/ability-provider";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }
  config.baseURL = "/api";
  return config;
});

const AdminRoute = () => (
  <Protected>
    <AbilityProvider ability={getAbilityFromToken()}>
      <>test</>
    </AbilityProvider>
  </Protected>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Authentication />} loader={authenticationLoader}>
      <Route index element={<Welcome />} />
      <Route path="/setup" element={<Setup />} />
      <Route path="/login" element={<Login />} action={loginAction} />
      <Route
        path="/receive-password"
        element={<ReceivePassword />}
        action={receivePasswordAction}
      />
      <Route path="/admin/*" element={<AdminRoute />} />
    </Route>
  )
);

export const ApplicationRoutes = () => {
  return <RouterProvider router={router} />;
};
