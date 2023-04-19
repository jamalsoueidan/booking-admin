import { Meta, StoryObj } from "@storybook/react";
import { InputLabelButton } from "./input-label-button";

const meta = {
  title: "Components/Input/InputLabelButton",
  component: InputLabelButton,
  args: {
    children: "Button",
  },
} satisfies Meta<typeof InputLabelButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputLabelButtonError: Story = {
  args: {
    labelled: { error: "error", label: "label" },
  },
};

export const InputLabelButtonNoError: Story = {
  args: {
    labelled: { label: "label" },
  },
};

export const InputLabelButtonLoading: Story = {
  args: {
    labelled: { label: "label" },
    button: {
      loading: true,
    },
  },
};
