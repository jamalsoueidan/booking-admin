import { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./calendar";
import { CalendarTitle } from "./calendar-title";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  args: {
    children: <CalendarTitle />,
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
