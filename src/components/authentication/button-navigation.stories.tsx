import type { Meta, StoryObj } from "@storybook/react";
import { ButtonNavigation } from "./button-navigation";

const meta: Meta<typeof ButtonNavigation> = {
  title: "Components/Authentication/ButtonNavigation",
  component: ButtonNavigation,
  argTypes: {},
  args: {
    children: "Normal",
  },
};

export default meta;

// need to setup an example with form submit to see the button in action
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
