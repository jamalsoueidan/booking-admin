import type { Meta, StoryObj } from "@storybook/react";
import { UserEmpty } from "./user-empty";

const meta = {
  title: "Components/User/UserEmpty",
  component: UserEmpty,
  argTypes: {},
} satisfies Meta<typeof UserEmpty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
