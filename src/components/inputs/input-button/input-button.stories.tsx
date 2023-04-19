import { Meta, StoryObj } from "@storybook/react";
import { InputButton } from "./input-button";

const meta = {
  title: "Components/Inputs/InputButton",
  component: InputButton,
  args: {
    children: "Button",
  },
} satisfies Meta<typeof InputButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const BasicWithError: Story = {
  args: {
    error: "error",
  },
};

export const BasicInputButtonLoading: Story = {
  args: {
    loading: true,
  },
};
