import axios from "axios";
import { setDefaultOptions } from "date-fns";
import da from "date-fns/locale/da";
import { Suspense, useMemo } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useInstallationGetStatus } from "./api/bookingShopifyApi";
import { LinkComponent } from "./components/application/link-component";
import { LoadingPage } from "./components/loading/loading-page";
import AuthPage from "./pages/auth/auth-page";
import NotFoundPage from "./pages/not-found-page";
import { SettingsProvider } from "./providers/setting-provider";
import Setup from "./setup";

axios.interceptors.request.use((config) => {
  return {
    ...config,
    baseURL: "/api", // use your own URL here or environment variable
  };
});

export const Application = () => {
  const { data } = useInstallationGetStatus();

  const navigate = useNavigate();

  const value = useMemo(
    () => ({
      LinkComponent: LinkComponent,
      language: "da",
      timeZone: "Europe/Copenhagen",
      navigate,
    }),
    [navigate]
  );

  setDefaultOptions({ locale: value.language === "da" ? da : undefined });

  return (
    <SettingsProvider value={value}>
      <Suspense fallback={<LoadingPage title="Loading page..." />}>
        {data?.data.payload?.done ? (
          <Routes>
            <Route path="/*" element={<AuthPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        ) : (
          <Setup />
        )}
      </Suspense>
    </SettingsProvider>
  );
};
