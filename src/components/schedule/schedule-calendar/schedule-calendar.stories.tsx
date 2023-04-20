import { Meta, StoryObj } from "@storybook/react";
import mock from "./mock";
import { ScheduleCalendar } from "./schedule-calendar";

const meta = {
  title: "Components/Schedule/ScheduleCalendar",
  component: ScheduleCalendar,
  argTypes: {},
  args: {
    data: mock as any,
  },
} satisfies Meta<typeof ScheduleCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const NoToolbar: Story = {
  args: {},
};
