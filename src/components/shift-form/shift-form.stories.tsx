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

const staticStartDate = "2023-04-25T10:00:00Z";
const staticEndDate = "2023-04-25T18:00:00Z";

export const Group: Story = {
  args: {
    data: {
      end: addHours(new Date(staticStartDate), 1),
      start: new Date(staticEndDate),
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
      end: addHours(new Date(staticStartDate), 1),
      start: new Date(staticEndDate),
      tag: "all_day",
    },
    method: "post",
  },
};
