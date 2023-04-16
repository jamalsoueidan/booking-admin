import axios from "axios";
import { setDefaultOptions } from "date-fns";
import da from "date-fns/locale/da";
import { Suspense, useCallback, useMemo } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./application.css";
import { LoadingPage } from "./components/loading/loading-page";
import AuthPage from "./pages/auth/auth-page";
import NotFoundPage from "./pages/not-found-page";
import { SettingsProvider } from "./providers/setting-provider";

axios.interceptors.request.use((config) => {
  return {
    ...config,
    baseURL: "/api", // use your own URL here or environment variable
  };
});

export const Application = () => {
  const navigate = useNavigate();

  const value = useMemo(
    () => ({
      LinkComponent,
      language: "da",
      timeZone: "Europe/Copenhagen",
      navigate,
    }),
    [navigate]
  );

  setDefaultOptions({ locale: value.language === "da" ? da : undefined });

  return (
    <>
      <SettingsProvider value={value}>
        <Suspense fallback={<LoadingPage title="Loading page..." />}>
          <Routes>
            <Route path="/*" element={<AuthPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </SettingsProvider>
    </>
  );
};

function LinkComponent({ url, children, external, ...rest }: any) {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(url);
  }, [navigate, url]);

  const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;
  const DEFAULT_PROPS = url ? { cursor: "pointer" } : {};

  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    return (
      <a
        {...rest}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={DEFAULT_PROPS}
      >
        {children}
      </a>
    );
  }

  return (
    <a {...rest} onClick={handleClick} role="alert" style={DEFAULT_PROPS}>
      {children}
    </a>
  );
}
