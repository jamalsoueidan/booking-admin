import { AlphaCard } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { Meta } from "@storybook/react";
import { useMemo } from "react";
import { InputMultiSelect, InputMultiSelectField } from "./input-multi-select";

const meta = {
  title: "Components/Inputs/InputMultiSelect",
  component: InputMultiSelect,
} satisfies Meta<typeof InputMultiSelect>;

export default meta;

export const Basic = () => {
  const options = useMemo(
    () => [
      { label: "Jamal", value: "jamal" },
      { label: "Sara", value: "sara" },
    ],
    []
  );

  const field = useField<InputMultiSelectField>(undefined);

  return (
    <AlphaCard>
      <InputMultiSelect
        field={field}
        options={options}
        input={{ label: "User list", placeholder: "Click and pick a user" }}
      />
    </AlphaCard>
  );
};
