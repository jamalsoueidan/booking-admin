import { CollectionResourceItem } from "./collection-resource-item";

import type { Meta, StoryObj } from "@storybook/react";
import { collection } from "./mockup";

const meta = {
  title: "Components/Collection/CollectionResourceItem",
  component: CollectionResourceItem,
  args: {
    collection: collection,
  },
} satisfies Meta<typeof CollectionResourceItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
