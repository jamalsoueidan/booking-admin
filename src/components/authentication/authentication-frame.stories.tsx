import type { Meta, StoryObj } from "@storybook/react";
import { AuthenticationFrame } from "./authentication-frame";

const meta: Meta<typeof AuthenticationFrame> = {
  title: "Components/Authentication/AuthenticationFrame",
  component: AuthenticationFrame,
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
