import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { setupAxios } from "./axios";
import Welcome from "./pages/welcome";

setupAxios();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" lazy={() => import("./pages/layouts/authentication")}>
        <Route index element={<Welcome />} />
        <Route path="/setup" lazy={() => import("./pages/setup")} />
        <Route path="/login" lazy={() => import("./pages/login")} />
        <Route
          path="/receive-password"
          lazy={() => import("./pages/receive-password")}
        />
      </Route>
      <Route path="/admin/" lazy={() => import("./pages/layouts/admin")}>
        <Route index lazy={() => import("./pages/admin/dashboard")} />
        <Route
          path="/admin/user/new"
          lazy={() => import("./pages/admin/users/create")}
        />
        <Route
          path="/admin/user/:id/edit"
          lazy={() => import("./pages/admin/users/edit")}
        />
        <Route
          path="/admin/users"
          lazy={() => import("./pages/admin/users/list")}
        />
      </Route>
    </Route>
  )
);

export const ApplicationRoutes = () => {
  return <RouterProvider router={router} />;
};
