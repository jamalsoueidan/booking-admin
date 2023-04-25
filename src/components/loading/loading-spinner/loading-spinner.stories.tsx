import { Modal } from "@shopify/polaris";
import type { Meta, StoryObj } from "@storybook/react";
import { LoadingSpinner } from "./loading-spinner";

const meta = {
  title: "Components/Loading/LoadingSpinner",
  component: LoadingSpinner,
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

export const ModalExample: Story = {
  args: {
    primary: true,
    label: "LoadingSpinner",
  },
  decorators: [
    (Story) => (
      <Modal open onClose={close} title="test" noScroll>
        <Story />
      </Modal>
    ),
  ],
};
