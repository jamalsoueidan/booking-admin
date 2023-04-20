export type Params = {
  [key: string]: string;
};

export type ParamsContextType = {
  values: Params;
  setValues: React.Dispatch<React.SetStateAction<Params>>;
  setSearch: (value: any) => void;
};
