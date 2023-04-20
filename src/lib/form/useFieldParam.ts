import { Field, FieldConfig, useField } from "@shopify/react-form";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export type FieldConfigParam<Value> = FieldConfig<Value> & { name: string };

export const useFieldParam = <Value = string>(
  input: FieldConfigParam<Value>,
  dependencies?: unknown[]
): Field<Value> => {
  const [searchParams, setSearchParams] = useSearchParams();
  const field = useField<Value>(
    { value: searchParams.get(input.name) || "", validates: [] } as any,
    dependencies
  );

  const reset = useCallback(() => {
    searchParams.delete(input.name);
    setSearchParams(searchParams);
    field.reset();
  }, [field.reset, setSearchParams, searchParams]);

  const onChange = useCallback(
    (value: unknown) => {
      searchParams.set(input.name, (value as any) || "");
      setSearchParams(searchParams);
      field.onChange(value as any);
    },
    [field.onChange, setSearchParams, searchParams]
  );

  return { ...field, reset, onChange };
};
