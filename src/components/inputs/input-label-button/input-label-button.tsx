import { ButtonProps, Labelled, LabelledProps } from "@shopify/polaris";
import { memo, useId } from "react";
import { InputButton } from "../input-button";

export interface InputLabelButtonProps {
  labelled: Omit<LabelledProps, "id">;
  button?: ButtonProps;
  children: ButtonProps["children"];
}

export const InputLabelButton = memo(
  ({ labelled, children, button }: InputLabelButtonProps) => {
    const id = useId();

    return (
      <Labelled id={`${id}-button-with-error`} {...labelled}>
        <InputButton error={labelled?.error} {...button}>
          {children}
        </InputButton>
      </Labelled>
    );
  }
);
