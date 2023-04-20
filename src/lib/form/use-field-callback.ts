import { Field, FieldConfig, useField } from "@shopify/react-form";
import { useCallback } from "react";

export type FieldConfigParam<Value> = FieldConfig<Value> &
  Partial<Pick<Field<Value>, "onChange" | "reset">>;

export const useFieldCallback = <Value = string>(
  input: FieldConfigParam<Value>,
  dependencies?: unknown[]
): Field<Value> => {
  const field = useField<Value>(
    { value: input.value, validates: [] } as any,
    dependencies
  );

  const reset = useCallback(() => {
    if (input.reset) {
      input.reset();
    }
    field.reset();
  }, [field.reset, input.reset]);

  const onChange = useCallback(
    (value: unknown) => {
      if (input.onChange) {
        input.onChange(value as any);
      }
      field.onChange(value as any);
    },
    [field.onChange, input.onChange]
  );

  return { ...field, reset, onChange };
};
