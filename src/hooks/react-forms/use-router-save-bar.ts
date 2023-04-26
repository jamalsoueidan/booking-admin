import { FieldBag, Form, getValues } from "@shopify/react-form";

import { FormWithoutDynamicListsInput, useForm } from "@shopify/react-form";
import { useCallback, useEffect } from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import { ErrorsErrorsItem } from "~/api/model";
import { useSaveBar } from "~/providers/save-bar";
import { useRouterErrors } from "./use-router-errors";

export type RouterSaveBarForm<T extends FieldBag> = Pick<
  Form<T>,
  "fields" | "submitErrors" | "dirty"
> & {
  actionErrors: ErrorsErrorsItem[] | undefined;
  submit: () => void;
};

export type RouterSaveBarType = "post" | "put" | "delete";

export type RouterSaveBarProps<T extends FieldBag> = Pick<
  FormWithoutDynamicListsInput<T>,
  "fields"
> & {
  method?: RouterSaveBarType;
};

export function useRouterSaveBar<T extends FieldBag>(
  input: RouterSaveBarProps<T>
): RouterSaveBarForm<T> {
  const form = useForm<T>({ ...input });
  const navigate = useNavigate();
  const send = useSubmit();
  const { updateSaveAction, updateDiscardAction, updateVisibility } =
    useSaveBar();

  const actionErrors = useRouterErrors({ fields: input.fields });

  const submit = useCallback(
    (event?: React.FormEvent) => {
      event?.preventDefault();
      if (form.validate().length === 0) {
        send(getValues(form.fields) as never, {
          method: input.method,
        });
      }
      return false;
    },
    [form, input.method, send]
  );

  const discard = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    updateSaveAction({ onAction: submit });
    updateDiscardAction({ onAction: discard });
    if (input.method === "post") {
      updateVisibility(true);
    }

    return () => {
      updateVisibility(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (input.method === "post") {
      updateSaveAction({ disabled: !form.dirty });
    }
    if (input.method === "put") {
      updateVisibility(form.dirty);
    }
  }, [form.dirty, input.method, updateSaveAction, updateVisibility]);

  return {
    fields: form.fields,
    actionErrors,
    submitErrors: form.submitErrors,
    dirty: form.dirty,
    submit,
  };
}
