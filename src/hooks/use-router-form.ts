import {
  FieldBag,
  Form,
  FormWithoutDynamicListsInput,
  useForm,
} from "@shopify/react-form";
import { useCallback, useEffect } from "react";
import { useActionData } from "react-router-dom";
import { BadResponseResponse } from "~/api/model";

export type RouterForm<T extends FieldBag> = Pick<
  Form<T>,
  "fields" | "submitErrors"
> & {
  onSubmit: (event: any) => void;
};

export function useRouterForm<T extends FieldBag>(
  input: Pick<FormWithoutDynamicListsInput<T>, "fields">
): RouterForm<T> {
  const data = useActionData() as BadResponseResponse | null;
  const form = useForm<T>({ ...input });

  const onSubmit = useCallback(
    (event: any) => {
      if (form.validate().length > 0) {
        event.preventDefault();
      }
    },
    [form.validate]
  );

  useEffect(() => {
    if (Array.isArray(data?.errors)) {
      data?.errors.forEach((error) => {
        error.path.forEach((path) => {
          const field = input.fields[path] as any;
          if (field) {
            field.setError(error.message);
          }
        });
      });
    }
  }, [data?.errors]);

  return { fields: form.fields, onSubmit, submitErrors: form.submitErrors };
}
