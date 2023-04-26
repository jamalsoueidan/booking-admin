import { Form as F, FormProps } from "react-router-dom";

export const Form = (props: FormProps) => {
  return (
    <F {...props}>
      {props.children}
      <input type="submit" hidden />
    </F>
  );
};
