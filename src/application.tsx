import { setDefaultOptions } from "date-fns";
import da from "date-fns/locale/da";
import { useMemo } from "react";
import { LinkComponent } from "./components/application/link-component";
import { SettingsProvider } from "./providers/setting-provider";
import { ApplicationRoutes } from "./routes";

export const Application = () => {
  const value = useMemo(
    () => ({
      LinkComponent: LinkComponent,
      language: "da",
      timeZone: "Europe/Copenhagen",
    }),
    []
  );

  setDefaultOptions({ locale: value.language === "da" ? da : undefined });

  return (
    <SettingsProvider value={value}>
      <ApplicationRoutes />
    </SettingsProvider>
  );
};
