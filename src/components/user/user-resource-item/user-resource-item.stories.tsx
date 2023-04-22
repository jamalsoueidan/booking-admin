import { Avatar, Button } from "@shopify/polaris";
import type { Meta, StoryObj } from "@storybook/react";
import { UserResourceItem } from "./user-resource-item";

const meta = {
  title: "Components/User/UserResourceItem",
  component: UserResourceItem,
  argTypes: {},
} satisfies Meta<typeof UserResourceItem>;

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
