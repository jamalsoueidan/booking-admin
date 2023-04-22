import { users } from "./mock";
import { UserAvatarStack } from "./user-avatar-stack";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/User/UserAvatarStack",
  component: UserAvatarStack,
  args: {
    users,
  },
  argTypes: {
    size: ["small", "large", "medium", "extraSmall"],
  },
} satisfies Meta<typeof UserAvatarStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const SmallRight: Story = {
  args: {
    size: "large",
    align: "right",
  },
};
