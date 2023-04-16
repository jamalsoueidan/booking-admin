import { LoadingSpinner } from "./loading-spinner";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Loading/LoadingSpinner",
  component: LoadingSpinner,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "LoadingSpinner",
  },
};
