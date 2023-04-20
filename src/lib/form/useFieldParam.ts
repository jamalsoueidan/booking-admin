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
    setSearchParams((prev) => {
      prev.delete(input.name);
      return prev;
    });
    field.reset();
  }, [field.reset, setSearchParams]);

  const onChange = useCallback(
    (value: unknown) => {
      setSearchParams((prev) => ({ ...prev, [input.name]: value || "" }));
      field.onChange(value as any);
    },
    [field.onChange, setSearchParams]
  );

  return { ...field, reset, onChange };
};
