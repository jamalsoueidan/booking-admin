import { Avatar, Button } from "@shopify/polaris";
import type { Meta, StoryObj } from "@storybook/react";
import { StaffResourceItem } from "./staff-resource-item";

const meta = {
  title: "Components/Staff/StaffResourceItem",
  component: StaffResourceItem,
  argTypes: {},
} satisfies Meta<typeof StaffResourceItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: "Title",
    desc: "Desc",
    media: <Avatar customer />,
  },
};

export const BasicWithAction: Story = {
  args: {
    title: "Title",
    desc: "Desc",
    media: <Avatar customer />,
    action: <Button>iojad</Button>,
  },
};
