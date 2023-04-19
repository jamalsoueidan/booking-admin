import { useField } from "@shopify/react-form";
import { InputTimeZone } from "./input-time-zone";

import { Meta } from "@storybook/react";

const meta = {
  title: "Components/Inputs/InputTimeZone",
  component: InputTimeZone,
} satisfies Meta<typeof InputTimeZone>;

export default meta;

export const BasicTimeZoneInput = () => {
  const field = useField("");
  return <InputTimeZone {...field} />;
};

export const PreSelectTimeZoneInput = () => {
  const field = useField("Europe/Istanbul");
  return <InputTimeZone {...field} />;
};
