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
      <Route path="/admin" lazy={() => import("./pages/layouts/admin")}>
        <Route index lazy={() => import("./pages/admin/dashboard")} />
        <Route
          path="user/new"
          lazy={() => import("./pages/admin/users/create-user")}
        />
        <Route
          path="user/:userId/edit"
          lazy={() => import("./pages/admin/users/edit-user")}
        />
        <Route
          path="user/:userId"
          lazy={() => import("./pages/admin/users/show-user")}
        >
          <Route
            path="create-shift"
            lazy={() => import("./pages/admin/users/create-shift")}
          />
          <Route
            path="edit-shift"
            lazy={() => import("./pages/admin/users/edit-shift")}
          />
          <Route
            path="delete-shift"
            lazy={() => import("./pages/admin/users/delete-shift")}
          />
        </Route>
        <Route path="users" lazy={() => import("./pages/admin/users/list")} />
      </Route>
    </Route>
  )
);

export const ApplicationRoutes = () => {
  return <RouterProvider router={router} />;
};
