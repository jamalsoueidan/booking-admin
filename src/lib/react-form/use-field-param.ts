import { Field, FieldConfig, useField } from "@shopify/react-form";
import { useCallback } from "react";
import { useSearchQuery } from "~/hooks/use-search-query";

export type UseFieldConfigParam<Value> = FieldConfig<Value> & { name: string };

export const useFieldParam = <Value = string>(
  input: UseFieldConfigParam<Value>,
  dependencies?: unknown[]
): Field<Value> => {
  const { resetQuery, getQuery, updateQuery } = useSearchQuery();
  const field = useField<Value>(
    { value: getQuery(input.name) || "", validates: [] } as never,
    dependencies
  );

  const reset = useCallback(() => {
    resetQuery();
    field.reset();
  }, [field, resetQuery]);

  const onChange = useCallback(
    (value: unknown) => {
      updateQuery({ [input.name]: value as never });
      field.onChange(value as never);
    },
    [updateQuery, input.name, field]
  );

  return { ...field, reset, onChange };
};
