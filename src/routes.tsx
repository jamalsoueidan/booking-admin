import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingPage } from "./components/loading/loading-page";
import NotFound from "./pages/not-found-page";

const Auth = lazy(() => import("./pages/auth/auth-page"));

export const ApplicationRoutes = () => (
  <Suspense fallback={<LoadingPage title="Loading page..." />}>
    <Routes>
      <Route path="/*" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);
