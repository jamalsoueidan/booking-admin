import { Button } from "@shopify/polaris";
import { Meta, StoryObj } from "@storybook/react";
import { addHours } from "date-fns";
import { ShiftForm } from "./shift-form";

const meta = {
  title: "Components/ShiftForm",
  component: ShiftForm,
  args: {
    children: <Button>Send</Button>,
  },
} satisfies Meta<typeof ShiftForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Group: Story = {
  args: {
    data: {
      end: addHours(new Date(), 1),
      start: new Date(),
      tag: "all_day",
      days: ["friday", "monday"],
      groupId: "123312",
    },
    method: "post",
    type: "group",
  },
};

export const Shift: Story = {
  args: {
    data: {
      end: addHours(new Date(), 1),
      start: new Date(),
      tag: "all_day",
    },
    method: "post",
  },
};
