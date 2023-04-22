import { LoadingPage } from "./loading-page";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Loading/LoadingPage",
  component: LoadingPage,
  argTypes: {},
} satisfies Meta<typeof LoadingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "LoadingSpinner",
  },
};
