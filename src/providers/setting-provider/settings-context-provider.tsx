import { useCallback, useEffect, useState } from "react";
import { PolarisProvider } from "../polaris-provider";
import { TranslationProvider } from "../translate-provider/translate-provider";
import { SettingsContext, defaultValues } from "./settings-context";
import { SettingsContextValues } from "./settings-context.types";

export type SettingsProviderProps = {
  children: React.ReactNode;
  value: SettingsContextValues;
};

export const SettingsProvider = ({
  children,
  value,
}: SettingsProviderProps) => {
  const [data, setData] = useState<SettingsContextValues>(defaultValues);

  const update = useCallback(
    (values: Partial<Omit<SettingsContextValues, "update">>) =>
      setData((prev) => ({ ...prev, ...values })),
    []
  );

  useEffect(() => {
    if (value) {
      update(value);
    }
  }, [update, value]);

  return (
    <SettingsContext.Provider value={{ ...data, update }}>
      <TranslationProvider language={data?.language}>
        <PolarisProvider
          linkComponent={data?.LinkComponent}
          locale={data.language}
        >
          {children}
        </PolarisProvider>
      </TranslationProvider>
    </SettingsContext.Provider>
  );
};
