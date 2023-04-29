import { CollectionResourceList } from "./collection-resource-list";
import { mockup } from "./mockup";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Collection/CollectionResourceList",
  component: CollectionResourceList,
  args: {
    collections: mockup,
  },
} satisfies Meta<typeof CollectionResourceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
