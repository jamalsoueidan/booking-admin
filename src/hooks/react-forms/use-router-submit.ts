import {
  FieldBag,
  Form,
  FormWithoutDynamicListsInput,
  getValues,
  useForm,
} from "@shopify/react-form";
import { useCallback } from "react";
import { useSubmit } from "react-router-dom";
import { ErrorsErrorsItem } from "~/api/model";
import { useRouterErrors } from "./use-router-errors";

export type RouterForm<T extends FieldBag> = Pick<
  Form<T>,
  "fields" | "submitErrors"
> & {
  onSubmit: (event: any) => void;
  actionErrors: ErrorsErrorsItem[] | undefined;
};

export function useRouterSubmit<T extends FieldBag>(
  input: Pick<FormWithoutDynamicListsInput<T>, "fields">
): RouterForm<T> {
  const form = useForm<T>({ ...input });
  const submit = useSubmit();
  const actionErrors = useRouterErrors({ fields: input.fields });

  const onSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      if (form.validate().length === 0) {
        submit(getValues(form.fields) as any, {
          method: "post",
        });
      }
    },
    [form.validate, form.fields]
  );

  return {
    fields: form.fields,
    onSubmit,
    submitErrors: form.submitErrors,
    actionErrors,
  };
}
