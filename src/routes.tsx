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

import ReceivePassword, {
  action as receivePasswordAction,
} from "./pages/receive-password";
import Setup from "./pages/setup";
import Welcome from "./pages/welcome";

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
    </Route>
  )
);

export const ApplicationRoutes = () => {
  return <RouterProvider router={router} />;
};

/*const AdminRoute = () => (
  <Route path="admin/*" element={<AdminRoute />} />
  <Protected>
    <AbilityProvider ability={getAbilityFromToken()}>
      <Admin />
    </AbilityProvider>
  </Protected>
);*/
