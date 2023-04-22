import type { Meta, StoryObj } from "@storybook/react";
import { StaffEmpty } from "./staff-empty";

const meta = {
  title: "Components/Staff/StaffEmpty",
  component: StaffEmpty,
  argTypes: {},
} satisfies Meta<typeof StaffEmpty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
