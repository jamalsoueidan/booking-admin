import { Field, FieldConfig, useField } from "@shopify/react-form";
import { useCallback } from "react";

export type FieldConfigParam<Value> = FieldConfig<Value> &
  Partial<Pick<Field<Value>, "onChange" | "reset">>;

export const useFieldCallback = <Value = string>(
  input: FieldConfigParam<Value>,
  dependencies?: unknown[]
): Field<Value> => {
  const field = useField<Value>(
    { value: input.value, validates: [] } as never,
    dependencies
  );

  const reset = useCallback(() => {
    if (input.reset) {
      input.reset();
    }
    field.reset();
  }, [field, input]);

  const onChange = useCallback(
    (value: unknown) => {
      if (input.onChange) {
        input.onChange(value as never);
      }
      field.onChange(value as never);
    },
    [field, input]
  );

  return { ...field, reset, onChange };
};
