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
            path="shifts"
            lazy={() => import("./pages/admin/users/shifts")}
          >
            <Route
              path="create"
              lazy={() => import("./pages/admin/users/shifts/create")}
            >
              <Route
                path="create-shift"
                lazy={() => import("./pages/admin/users/shifts/create-shift")}
              />
              <Route
                path="create-shift-group"
                lazy={() =>
                  import("./pages/admin/users/shifts/create-shift-group")
                }
              />
            </Route>

            <Route
              path="edit"
              lazy={() => import("./pages/admin/users/shifts/edit")}
            >
              <Route
                path="edit-shift"
                lazy={() => import("./pages/admin/users/shifts/edit-shift")}
              />
              <Route
                path="edit-shift-group"
                lazy={() =>
                  import("./pages/admin/users/shifts/edit-shift-group")
                }
              />
            </Route>
            <Route
              path="delete-shift"
              lazy={() => import("./pages/admin/users/shifts/delete-shift")}
            />
            <Route
              path="delete-shift-group"
              lazy={() =>
                import("./pages/admin/users/shifts/delete-shift-group")
              }
            />
          </Route>
        </Route>
        <Route path="users" lazy={() => import("./pages/admin/users/list")} />
      </Route>
    </Route>
  )
);

export const ApplicationRoutes = () => {
  return <RouterProvider router={router} />;
};
