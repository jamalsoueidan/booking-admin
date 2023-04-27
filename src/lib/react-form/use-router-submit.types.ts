import {
  FieldBag,
  Form,
  FormWithoutDynamicListsInput,
} from "@shopify/react-form";

export type UseRouterSubmit<T extends FieldBag> = Pick<
  Form<T>,
  "fields" | "submitErrors" | "dirty" | "reset"
> & {
  submit: (event?: React.FormEvent) => void;
  method: UseRouterSubmitMethods;
};

export type UseRouterSubmitMethods = "put" | "post" | "delete";

export type UseRouterSubmitInput<T extends FieldBag> = Pick<
  FormWithoutDynamicListsInput<T>,
  "fields"
> & {
  method?: UseRouterSubmitMethods;
};
