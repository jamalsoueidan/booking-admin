import type { Meta, StoryObj } from "@storybook/react";
import { AuthenticationWrapper } from "./authentication-wrapper";

const meta: Meta<typeof AuthenticationWrapper> = {
  title: "Components/Authentication/AuthenticationWrapper",
  component: AuthenticationWrapper,
  argTypes: {},
  args: {
    title: "Title",
    children: <>children</>,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
