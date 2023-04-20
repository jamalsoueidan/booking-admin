import { ReactNode, createContext, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Params, ParamsContextType } from "./types";

export type ParamsProviderProps = {
  children: ReactNode;
};

export const ParamsContext = createContext<ParamsContextType>({
  values: {},
  setValues: (defaultValue: any) => {},
  setSearch: (defaultValue: any) => {},
});

export const ParamsProvider = ({ children }: ParamsProviderProps) => {
  const [search, setSearch] = useSearchParams();
  const [values, setValues] = useState<Params>(
    Object.fromEntries(search) as any
  );

  const value = useMemo(() => {
    return { setSearch, setValues, values };
  }, [values]);

  return (
    <ParamsContext.Provider value={value}>{children}</ParamsContext.Provider>
  );
};
