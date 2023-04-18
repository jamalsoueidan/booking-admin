import { users } from "./mock";
import { StaffAvatarStack } from "./staff-avatar-stack";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Staff/StaffAvatarStack",
  component: StaffAvatarStack,
  argTypes: {
    size: ["small", "large", "medium", "extraSmall"],
  },
} satisfies Meta<typeof StaffAvatarStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    users,
    size: "large",
  },
};

export const Small: Story = {
  args: {
    users,
    size: "small",
  },
};

export const SmallRight: Story = {
  args: {
    users,
    size: "large",
    align: "right",
  },
};
