import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useInstallationGetStatus } from "./api/bookingShopifyApi";
import { AuthenticationFrame } from "./components/authentication/authentication-frame";
import { LoadingPage } from "./components/loading/loading-page";
import NotFound from "./pages/not-found";

const Index = lazy(() => import("./pages/index"));
const Setup = lazy(() => import("./pages/setup"));
const Login = lazy(() => import("./pages/login"));
const ReceivePassword = lazy(() => import("./pages/recieve-password"));

export const ApplicationRoutes = () => {
  const navigate = useNavigate();
  const { data } = useInstallationGetStatus();

  useEffect(() => {
    if (!data?.data.payload?.done) {
      navigate("/setup");
    }
  }, [data?.data.payload]);

  console.log(data);

  return (
    <Suspense fallback={<LoadingPage title="Loading page" />}>
      <Routes>
        <Route path="/" element={<AuthenticationFrame />}>
          {!data?.data.payload?.done && (
            <Route path="/setup" element={<Setup />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/receive-password" element={<ReceivePassword />} />
          <Route index element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
