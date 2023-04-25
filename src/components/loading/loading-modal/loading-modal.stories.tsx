import { Frame } from "@shopify/polaris";
import { LoadingModal } from "./loading-modal";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Loading/LoadingModal",
  component: LoadingModal,
  argTypes: {},
  decorators: [
    (Story) => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
} satisfies Meta<typeof LoadingModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "LoadingSpinner",
  },
};
