import { AppProvider, AppProviderProps } from "@shopify/polaris";
import da from "@shopify/polaris/locales/da.json";
import en from "@shopify/polaris/locales/en.json";
import { useI18n } from "@shopify/react-i18n";
import { ReactNode } from "react";

export type PolarisProviderProps = {
  children: ReactNode;
  linkComponent: AppProviderProps["linkComponent"];
};

export const PolarisProvider = ({
  children,
  ...props
}: PolarisProviderProps) => {
  const [i18n] = useI18n({
    fallback: da,
    id: "Polaris",
    async translations(locale) {
      return locale === "en" ? en : da;
    },
  });
  const { locale, translations } = i18n;

  return (
    <AppProvider
      {...props}
      i18n={locale === "da" ? translations[0] : translations[1]}
    >
      {children}
    </AppProvider>
  );
};
