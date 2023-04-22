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

export type RouterSubmit<T extends FieldBag> = Pick<
  Form<T>,
  "fields" | "submitErrors"
> & {
  onSubmit: (event: React.FormEvent) => void;
  actionErrors: ErrorsErrorsItem[] | undefined;
};

export function useRouterSubmit<T extends FieldBag>(
  input: Pick<FormWithoutDynamicListsInput<T>, "fields">
): RouterSubmit<T> {
  const form = useForm<T>({ ...input });
  const submit = useSubmit();
  const actionErrors = useRouterErrors({ fields: input.fields });

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (form.validate().length === 0) {
        submit(getValues(form.fields) as never, {
          method: "post",
        });
      }
    },
    [form, submit]
  );

  return {
    fields: form.fields,
    onSubmit,
    submitErrors: form.submitErrors,
    actionErrors,
  };
}
