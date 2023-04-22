import { Field, FieldConfig, useField } from "@shopify/react-form";
import { useCallback } from "react";
import { useSearchQuery } from "~/hooks/use-search-query";

export type FieldConfigParam<Value> = FieldConfig<Value> & { name: string };

export const useFieldParam = <Value = string>(
  input: FieldConfigParam<Value>,
  dependencies?: unknown[]
): Field<Value> => {
  const { resetQuery, getQuery, updateQuery } = useSearchQuery();
  const field = useField<Value>(
    { value: getQuery(input.name) || "", validates: [] } as any,
    dependencies
  );

  const reset = useCallback(() => {
    resetQuery();
    field.reset();
  }, [field, resetQuery]);

  const onChange = useCallback(
    (value: unknown) => {
      updateQuery({ [input.name]: value as any });
      field.onChange(value as any);
    },
    [updateQuery, input.name, field]
  );

  return { ...field, reset, onChange };
};
