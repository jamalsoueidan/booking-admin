import { FormError } from "@shopify/react-form";
import { Form as F, FormProps as FP } from "react-router-dom";
import { FormErrors } from "~/components/form-errors";

export type FormProps = FP & { submitErrors?: FormError[] };

export const Form = ({ submitErrors, children, ...props }: FormProps) => {
  return (
    <F {...props}>
      {submitErrors ? <FormErrors errors={submitErrors} /> : null}
      {children}
      <input type="submit" hidden />
    </F>
  );
};
