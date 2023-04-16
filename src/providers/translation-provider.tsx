import { I18nContext, I18nManager } from "@shopify/react-i18n";
import { ReactNode, useEffect, useMemo } from "react";

export interface TranslationProviderProps {
  language: string;
  children: ReactNode;
}

export const TranslationProvider = ({
  language,
  children,
}: TranslationProviderProps) => {
  const manager = useMemo(
    () =>
      new I18nManager({
        locale: language,
        onError: (details) => {
          // eslint-disable-next-line no-console
          console.log(details);
        },
      }),
    [language]
  );

  useEffect(() => {
    if (language) {
      manager.update({ locale: language });
    }
  }, [language, manager]);

  return (
    <I18nContext.Provider value={manager}>{children}</I18nContext.Provider>
  );
};
