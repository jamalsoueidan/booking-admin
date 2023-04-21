import {
  FieldBag,
  Form,
  FormWithoutDynamicListsInput,
  useForm,
} from "@shopify/react-form";
import { useCallback } from "react";
import { ErrorsErrorsItem } from "~/api/model";
import { useRouterErrors } from "./use-router-errors";

export type RouterForm<T extends FieldBag> = Pick<
  Form<T>,
  "fields" | "submitErrors"
> & {
  onSubmit: (event: any) => void;
  actionErrors: ErrorsErrorsItem[] | undefined;
};

export function useRouterForm<T extends FieldBag>(
  input: Pick<FormWithoutDynamicListsInput<T>, "fields">
): RouterForm<T> {
  const form = useForm<T>({ ...input });
  const actionErrors = useRouterErrors({ fields: input.fields });

  const onSubmit = useCallback(
    (event: any) => {
      if (form.validate().length > 0) {
        event.preventDefault();
      }
    },
    [form]
  );

  return {
    fields: form.fields,
    onSubmit,
    actionErrors,
    submitErrors: form.submitErrors,
  };
}
