import { FieldBag, FormError, getValues, useForm } from "@shopify/react-form";
import { useCallback, useState } from "react";
import { useSubmit } from "react-router-dom";
import { useRouterActionErrors } from "./use-router-action-errors";
import {
  UseRouterSubmit,
  UseRouterSubmitInput,
} from "./use-router-submit.types";

export function useRouterSubmit<T extends FieldBag>(
  input: UseRouterSubmitInput<T>
): UseRouterSubmit<T> {
  const form = useForm<T>({ ...input });
  const send = useSubmit();
  const [submitErrors, setSubmitErrors] = useState<FormError[]>([]);

  const actionErrors = useRouterActionErrors(form);

  const submit = useCallback(
    (event?: React.FormEvent) => {
      event?.preventDefault();
      setSubmitErrors(form.validate());
      if (form.validate().length === 0) {
        send(getValues(form.fields) as never, {
          method: input.method || "post",
        });
      }
      return false;
    },
    [form, input.method, send]
  );

  return {
    method: input.method || "post",
    fields: form.fields,
    reset: form.reset,
    submit,
    dirty: form.dirty,
    submitErrors: actionErrors || submitErrors,
  };
}
