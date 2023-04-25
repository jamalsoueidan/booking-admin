import { Meta, StoryObj } from "@storybook/react";
import { ScheduleCalendar } from "./schedule-calendar";

const meta = {
  title: "Components/ScheduleCalendar",
  component: ScheduleCalendar,
  argTypes: {},
  args: {
    data: [],
  },
} satisfies Meta<typeof ScheduleCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const NoToolbar: Story = {
  args: {},
};
