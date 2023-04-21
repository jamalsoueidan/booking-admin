import { Field, FieldConfig, useField } from "@shopify/react-form";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useParams } from "~/providers/params-provider";

export type FieldConfigParam<Value> = FieldConfig<Value> & { name: string };

export const useFieldParam = <Value = string>(
  input: FieldConfigParam<Value>,
  dependencies?: unknown[]
): Field<Value> => {
  const [search] = useSearchParams();
  const { setParams, resetParams } = useParams([input.name]);
  const field = useField<Value>(
    { value: search.get(input.name) || "", validates: [] } as any,
    dependencies
  );

  const reset = useCallback(() => {
    resetParams();
    field.reset();
  }, [field.reset, resetParams]);

  const onChange = useCallback(
    (value: unknown) => {
      setParams({ [input.name]: value as any });
      field.onChange(value as any);
    },
    [field.onChange, setParams]
  );

  return { ...field, reset, onChange };
};
