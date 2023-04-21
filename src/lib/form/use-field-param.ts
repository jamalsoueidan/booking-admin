import { Field, FieldConfig, useField } from "@shopify/react-form";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export type FieldConfigParam<Value> = FieldConfig<Value> & { name: string };

export const useFieldParam = <Value = string>(
  input: FieldConfigParam<Value>,
  dependencies?: unknown[]
): Field<Value> => {
  const [search, setSearch] = useSearchParams();
  const field = useField<Value>(
    { value: search.get(input.name) || "", validates: [] } as any,
    dependencies
  );

  const reset = useCallback(() => {
    setSearch();
    field.reset();
  }, [field, setSearch]);

  const onChange = useCallback(
    (value: unknown) => {
      console.log(JSON.stringify(search));
      setSearch({ [input.name]: value as any });
      field.onChange(value as any);
    },
    [field, input.name, setSearch, search]
  );

  return { ...field, reset, onChange };
};
