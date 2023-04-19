import { useField } from "@shopify/react-form";
import { Meta } from "@storybook/react";
import { InputLanguage } from "./input-language";

const meta = {
  title: "Components/Inputs/InputLanguage",
  component: InputLanguage,
} satisfies Meta<typeof InputLanguage>;

export default meta;

export const BasicLanguageInput = () => {
  const field = useField("");
  return <InputLanguage {...field} />;
};

export const CustomLabelPlaceholderLanguageInput = () => {
  const field = useField("");
  return <InputLanguage label="speech" placeholder="hej" {...field} />;
};

export const PreSelectValueLanguageInput = () => {
  const field = useField("da");
  return <InputLanguage {...field} />;
};
