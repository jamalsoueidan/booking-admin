import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { setupAxios } from "./axios";
import Welcome from "./pages/welcome";

setupAxios();

const ShiftRoutes = [
  {
    path: "shifts",
    lazy: () => import("./pages/admin/users/shifts"),
    children: [
      {
        path: "create",
        lazy: () => import("./pages/admin/users/shifts/create"),
        children: [
          {
            path: "create-shift",
            lazy: () => import("./pages/admin/users/shifts/create-shift"),
          },
          {
            path: "create-shift-group",
            lazy: () => import("./pages/admin/users/shifts/create-shift-group"),
          },
        ],
      },
      {
        path: "edit",
        lazy: () => import("./pages/admin/users/shifts/edit"),
        children: [
          {
            path: "edit-shift",
            lazy: () => import("./pages/admin/users/shifts/edit-shift"),
          },
          {
            path: "edit-shift-group",
            lazy: () => import("./pages/admin/users/shifts/edit-shift-group"),
          },
        ],
      },
      {
        path: "delete-shift",
        lazy: () => import("./pages/admin/users/shifts/delete-shift"),
      },
      {
        path: "delete-shift-group",
        lazy: () => import("./pages/admin/users/shifts/delete-shift-group"),
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("./pages/layouts/authentication"),
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "/setup",
        lazy: () => import("./pages/setup"),
      },
      {
        path: "/login",
        lazy: () => import("./pages/login"),
      },
      {
        path: "/receive-password",
        lazy: () => import("./pages/receive-password"),
      },
    ],
  },
  {
    path: "/admin",
    lazy: () => import("./pages/layouts/admin"),
    children: [
      {
        index: true,
        lazy: () => import("./pages/admin/dashboard"),
      },
      {
        path: "my/:userId",
        lazy: () => import("./pages/admin/my/shifts"),
        children: ShiftRoutes,
      },
      {
        path: "my/user",
        lazy: () => import("./pages/admin/my/user"),
      },
      {
        path: "my/settings",
        lazy: () => import("./pages/admin/my/settings"),
      },
      {
        path: "user/new",
        lazy: () => import("./pages/admin/users/create-user"),
      },
      {
        path: "user/:userId/edit",
        lazy: () => import("./pages/admin/users/edit-user"),
      },
      {
        path: "user/:userId",
        lazy: () => import("./pages/admin/users/show-user"),
        children: ShiftRoutes,
      },
      {
        path: "users",
        lazy: () => import("./pages/admin/users/list-users"),
      },
    ],
  },
]);
export const ApplicationRoutes = () => {
  return <RouterProvider router={router} />;
};
