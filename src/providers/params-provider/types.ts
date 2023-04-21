import { MutableRefObject } from "react";

export type Params = {
  [key: string]: string;
};

export type ParamsContextType = {
  search: MutableRefObject<Params>;
  refreshSearch: React.SetStateAction<any>;
};
