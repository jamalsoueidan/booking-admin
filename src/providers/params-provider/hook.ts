import { useCallback, useContext, useEffect } from "react";
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
  const { values, setValues, setSearch } = useContext(ParamsContext);

  const setParams = useCallback(
    (newValues: Partial<Record<K, any>>) => {
      setValues((prevValues) => {
        const updatedValues = inputs.reduce((acc, key) => {
          if (!newValues[key]) {
            delete acc[key];
          } else {
            acc[key] = newValues[key];
          }
          return acc;
        }, deepClone(prevValues));

        return updatedValues;
      });
    },
    [inputs]
  );

  const resetParams = useCallback(() => {
    setValues((prevValues) => {
      const updatedValues = inputs.reduce((acc, key) => {
        delete acc[key];
        return acc;
      }, deepClone(prevValues));

      return updatedValues;
    });
  }, [inputs]);

  const updateParams = useCallback(
    (newValues: Partial<Record<K, any>>) => {
      setValues((prevValues) => {
        const updatedValues = inputs.reduce((acc, key) => {
          if (newValues[key]) {
            acc[key] = newValues[key];
          }
          return acc;
        }, deepClone(prevValues));
        console.log(newValues, prevValues, updatedValues);
        return updatedValues;
      });
    },
    [inputs]
  );

  useEffect(() => {
    setSearch(values);
  }, [JSON.stringify(values)]);

  return {
    params: values,
    setParams,
    updateParams,
    resetParams,
  };
};
