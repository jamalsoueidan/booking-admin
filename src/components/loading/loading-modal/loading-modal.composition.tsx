import { LoadingModal } from "./loading-modal";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Loading/LoadingModal",
  component: LoadingModal,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LoadingModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "LoadingSpinner",
  },
};
