import { AlphaCard } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { InputTags, InputTagsField } from "./input-tags";

import { Meta } from "@storybook/react";

const meta = {
  title: "Components/Inputs/InputTags",
  component: InputTags,
} satisfies Meta<typeof InputTags>;

export default meta;

export const Basic = () => {
  const field = useField<InputTagsField>(undefined);
  return (
    <>
      <AlphaCard>
        <InputTags field={field} />
      </AlphaCard>
      <div>
        <pre>choice: {field.value}</pre>
      </div>
    </>
  );
};

export const BasicLabelHidden = () => {
  const field = useField<InputTagsField>(undefined);
  return (
    <>
      <AlphaCard>
        <InputTags field={field} input={{ labelHidden: true }} />
      </AlphaCard>
      <div>
        <pre>choice: {field.value}</pre>
      </div>
    </>
  );
};
