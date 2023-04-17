import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useInstallationGetStatus } from "./api/bookingShopifyApi";
import { AuthenticationFrame } from "./components/authentication/authentication-frame";
import { LoadingPage } from "./components/loading/loading-page";
import NotFound from "./pages/not-found";

const Index = lazy(() => import("./pages/index"));
const Setup = lazy(() => import("./pages/setup"));
const Login = lazy(() => import("./pages/login"));
const Phone = lazy(() => import("./pages/phone"));

export const ApplicationRoutes = () => {
  const { data, isInitialLoading } = useInstallationGetStatus();
  if (isInitialLoading) {
    return <LoadingPage title="Loading data" />;
  }

  return (
    <Suspense fallback={<LoadingPage title="Loading page" />}>
      <Routes>
        {!data?.data.payload?.done ? (
          <Route path="*" element={<AuthenticationFrame />}>
            <Route index element={<Setup />} />
          </Route>
        ) : (
          <Route path="/" element={<AuthenticationFrame />}>
            <Route path="/login" element={<Login />} />
            <Route path="/phone" element={<Phone />} />
            <Route index element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
};
