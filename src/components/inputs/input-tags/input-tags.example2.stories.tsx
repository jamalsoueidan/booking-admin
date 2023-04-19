import { AlphaCard } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { InputTags, InputTagsField } from "./input-tags";

import { Meta } from "@storybook/react";

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

const meta = {
  title: "Components/Schedule/ScheduleCalendar",
  component: BasicLabelHidden,
  argTypes: {},
} satisfies Meta<typeof BasicLabelHidden>;

export default meta;
