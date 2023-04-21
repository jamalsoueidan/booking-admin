import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  createSearchParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { Params, ParamsContextType } from "./types";

export type ParamsProviderProps = {
  children: ReactNode;
};

export const ParamsContext = createContext<ParamsContextType>({
  search: {} as any,
  refreshSearch: (defaultValue: any) => {},
});

export const ParamsProvider = ({ children }: ParamsProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const pathname = useRef(location.pathname);
  const search = useRef<Params>(Object.fromEntries(searchParams) as any);

  // are used as force update
  const [_, forceUpdate] = useState<any>();

  const refreshSearch = useCallback(() => {
    forceUpdate({});
  }, []);

  useEffect(() => {
    if (pathname.current !== location.pathname) {
      search.current = Object.fromEntries(createSearchParams(location.search));
      pathname.current = location.pathname;
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    setSearchParams(search.current);
  }, [_]);

  return (
    <ParamsContext.Provider value={{ search, refreshSearch }}>
      {children}
    </ParamsContext.Provider>
  );
};
