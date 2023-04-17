import { AppProvider, AppProviderProps } from "@shopify/polaris";
import da from "@shopify/polaris/locales/da.json";
import en from "@shopify/polaris/locales/en.json";
import { ReactNode } from "react";

export type PolarisProviderProps = {
  children: ReactNode;
  locale: string;
  linkComponent: AppProviderProps["linkComponent"];
};

export const PolarisProvider = ({
  children,
  locale,
  ...props
}: PolarisProviderProps) => {
  return (
    <AppProvider {...props} i18n={locale === "da" ? da : en}>
      {children}
    </AppProvider>
  );
};
