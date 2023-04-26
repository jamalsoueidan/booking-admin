import { FormError } from "@shopify/react-form";
import { Form as F, FormProps } from "react-router-dom";
import { FormErrors } from "~/components/form-errors";

export const Form = (props: FormProps & { submitErrors?: FormError[] }) => {
  return (
    <F {...props}>
      {props.submitErrors ? <FormErrors errors={props.submitErrors} /> : null}
      {props.children}
      <input type="submit" hidden />
    </F>
  );
};
