import { BadgeStatus } from "./badge-status";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/BadgeStatus",
  component: BadgeStatus,
  argTypes: {},
} satisfies Meta<typeof BadgeStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    active: true,
  },
};
