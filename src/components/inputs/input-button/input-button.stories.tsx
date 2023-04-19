import { Meta, StoryObj } from "@storybook/react";
import { InputButton } from "./input-button";

const meta = {
  title: "Components/Input/InputButton",
  component: InputButton,
  argTypes: {},
} satisfies Meta<typeof InputButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    error: "error",
  },
};

export const BasicInputButtonNoError: Story = {};

export const BasicInputButtonLoading: Story = {
  args: {
    loading: true,
  },
};
