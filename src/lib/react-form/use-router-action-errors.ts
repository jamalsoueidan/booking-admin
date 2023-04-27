import { Field, FieldBag } from "@shopify/react-form";
import { useEffect } from "react";
import { useActionData } from "react-router-dom";
import { BadResponseResponse } from "~/api/model";
import { UseRouterSubmitInput } from "./use-router-submit.types";

export function useRouterActionErrors<T extends FieldBag>(
  input: UseRouterSubmitInput<T>
) {
  const data = useActionData() as BadResponseResponse | null;

  useEffect(() => {
    if (Array.isArray(data?.errors)) {
      data?.errors.forEach((error) => {
        error.path.forEach((path) => {
          const field = input.fields[path] as Field<T>;
          if (field && !field.error) {
            field.setError(error.message);
          }
        });
      });
    }
  }, [data, input, input.fields]);

  return data?.errors;
}
