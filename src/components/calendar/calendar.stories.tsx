import { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./calendar";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  argTypes: {},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
