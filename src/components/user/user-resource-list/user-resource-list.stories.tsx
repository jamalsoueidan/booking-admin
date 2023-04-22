import type { Meta, StoryObj } from "@storybook/react";
import { UserResourceList } from "./user-resource-list";

const meta = {
  title: "Components/User/UserResourceList",
  component: UserResourceList,
  argTypes: {},
} satisfies Meta<typeof UserResourceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const List: Story = {
  args: {
    items: [1, 2, 3],
    renderItem: (item: unknown) => {
      if (item === 1) {
        return {
          desc: "front-end",
          title: "jamal",
        };
      }
      if (item === 2) {
        return {
          desc: "enginner",
          title: "thomas",
        };
      }
      return {
        desc: "teamlead",
        title: "mikkel",
      };
    },
  },
};
