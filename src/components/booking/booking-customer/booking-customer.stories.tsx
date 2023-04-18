import { BookingCustomer } from "./booking-customer";

import type { Meta, StoryObj } from "@storybook/react";
import mock from "./mock";

const meta: Meta<typeof BookingCustomer> = {
  title: "Components/Booking/BookingCustomer",
  component: BookingCustomer,
  argTypes: {},
  args: {
    booking: mock,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {};
