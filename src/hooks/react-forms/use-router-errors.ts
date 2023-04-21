import {
  FieldBag,
  Form,
  FormWithoutDynamicListsInput,
} from "@shopify/react-form";
import { useActionData } from "react-router-dom";
import { BadResponseResponse } from "~/api/model";

export type RouterForm<T extends FieldBag> = Pick<Form<T>, "fields">;

export function useRouterErrors<T extends FieldBag>(
  input: Pick<FormWithoutDynamicListsInput<T>, "fields">
) {
  const data = useActionData() as BadResponseResponse | null;

  /*useEffect(() => {
    console.log("errors");
    if (Array.isArray(data?.errors)) {
      data?.errors.forEach((error) => {
        error.path.forEach((path) => {
          const field = input.fields[path] as Field<T>;
          if (field) {
            field.setError(error.message);
          }
        });
      });
    }
  }, [JSON.stringify(data), input.fields]);*/

  return data?.errors;
}
