import { AlphaCard } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { Meta } from "@storybook/react";
import { ShiftDayItem } from "~/api/model";
import { InputDays } from "./input-days";

const meta = {
  title: "Components/Inputs/InputDays",
  component: InputDays,
} satisfies Meta<typeof InputDays>;

export default meta;

export const Basic = () => {
  const field = useField<ShiftDayItem[]>([]);
  return (
    <>
      <AlphaCard>
        <InputDays field={field} />
      </AlphaCard>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </>
  );
};
