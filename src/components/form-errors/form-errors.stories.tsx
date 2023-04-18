import { FormErrors } from "./form-errors";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/FormErrors",
  component: FormErrors,
  argTypes: {},
} satisfies Meta<typeof FormErrors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    errors: [{ message: "fejl i din besked" }],
  },
};
