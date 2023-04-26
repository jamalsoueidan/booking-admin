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

export type UseRouterSubmit<T extends FieldBag> = Pick<
  Form<T>,
  "fields" | "submitErrors" | "dirty" | "reset"
> & {
  actionErrors: ErrorsErrorsItem[] | undefined;
  submit: (event?: React.FormEvent) => void;
};

export type UseRouterSubmitMethods = "put" | "post" | "delete";

export type UseRouterSubmitInput<T extends FieldBag> = Pick<
  FormWithoutDynamicListsInput<T>,
  "fields"
> & {
  method: UseRouterSubmitMethods;
};

export function useRouterSubmit<T extends FieldBag>(
  input: UseRouterSubmitInput<T>
): UseRouterSubmit<T> {
  const form = useForm<T>({ ...input });
  const send = useSubmit();
  const actionErrors = useRouterErrors({ fields: input.fields });

  const submit = useCallback(
    (event?: React.FormEvent) => {
      event?.preventDefault();
      if (form.validate().length === 0) {
        send(getValues(form.fields) as never, {
          method: input.method,
        });
      }
    },
    [form, input.method, send]
  );

  return {
    fields: form.fields,
    reset: form.reset,
    submit,
    dirty: form.dirty,
    submitErrors: form.submitErrors,
    actionErrors,
  };
}
