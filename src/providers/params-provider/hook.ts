import { useCallback, useContext } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ParamsContext } from "./provider";

function deepClone<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) {
    return obj as T;
  }

  if (Array.isArray(obj)) {
    return (obj as any[]).map((item) => deepClone(item)) as unknown as T;
  }

  const clonedObj: Record<string, any> = {};
  for (const key in obj) {
    clonedObj[key] = deepClone((obj as Record<string, any>)[key]);
  }
  return clonedObj as T;
}

export const useParams = <K extends string>(inputs: K[]) => {
  const { search, refreshSearch } = useContext(ParamsContext);
  const nav = useNavigate();

  const setParams = useCallback(
    (newValues: Partial<Record<K, any>>) => {
      search.current = inputs.reduce((acc, key) => {
        if (!newValues[key]) {
          delete acc[key];
        } else {
          acc[key] = newValues[key];
        }
        return acc;
      }, deepClone(search.current));

      refreshSearch();
    },
    [inputs]
  );

  const resetParams = useCallback(() => {
    search.current = inputs.reduce((acc, key) => {
      delete acc[key];
      return acc;
    }, deepClone(search.current));
    refreshSearch();
  }, [inputs]);

  const updateParams = useCallback(
    (newValues: Partial<Record<K, any>>) => {
      search.current = inputs.reduce((acc, key) => {
        if (newValues[key]) {
          acc[key] = newValues[key];
        }
        return acc;
      }, deepClone(search.current));

      refreshSearch();
    },
    [inputs]
  );

  const navigate = useCallback(
    ({
      pathname,
      search: additionalSearch,
    }: {
      pathname: string;
      search: object;
    }) => {
      nav({
        pathname,
        search: createSearchParams({
          ...search.current,
          ...additionalSearch,
        }).toString(),
      });
    },
    []
  );

  return {
    params: search.current,
    setParams,
    updateParams,
    resetParams,
    navigate,
  };
};
