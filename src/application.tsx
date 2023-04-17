import axios from "axios";
import { setDefaultOptions } from "date-fns";
import da from "date-fns/locale/da";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LinkComponent } from "./components/application/link-component";
import { SettingsProvider } from "./providers/setting-provider";
import { ApplicationRoutes } from "./routes";

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
      <ApplicationRoutes />
    </SettingsProvider>
  );
};
