import { useContext } from "react";
import { SettingsContext } from "./settings-context";
import {
  LinkComponentProps,
  SettingsContextType,
} from "./settings-context.types";

export const useSettings = () => {
  const context = useContext<SettingsContextType>(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
};

export const Link = ({ children, url, ...rest }: LinkComponentProps) => {
  const { LinkComponent } = useSettings();

  if (LinkComponent) {
    return (
      <LinkComponent {...rest} url={url} target="_self">
        {children}
      </LinkComponent>
    );
  }
  return <>{children}</>;
};
