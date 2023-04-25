import { Frame } from "@shopify/polaris";
import { LoadingPage } from "./loading-page";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Loading/LoadingPage",
  component: LoadingPage,
  argTypes: {},
  decorators: [
    (Story) => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
} satisfies Meta<typeof LoadingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "LoadingSpinner",
  },
};
