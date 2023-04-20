import { AlphaCard, Button } from "@shopify/polaris";
import { Meta, StoryObj } from "@storybook/react";
import { addMonths, setHours, setMinutes } from "date-fns";
import { useCallback, useRef, useState } from "react";
import { ShiftTag } from "~/api/model";
import { useToast } from "~/providers/toast";
import {
  ScheduleFormManyShifts,
  ScheduleFormManyShiftsAllowEditing,
  ScheduleFormManyShiftsBody,
  ScheduleFormManyShiftsRefMethod,
  ScheduleFormManyShiftsSubmitResult,
} from "./schedule-form-many-shifts";

const MockComponent = ({
  data,
  allowEditing,
}: {
  data: ScheduleFormManyShiftsBody;
  allowEditing?: ScheduleFormManyShiftsAllowEditing;
}) => {
  const ref = useRef<ScheduleFormManyShiftsRefMethod>(null);
  const { show } = useToast();
  const [body, setBody] = useState({});

  const onSubmit = useCallback(
    (
      fieldValues: ScheduleFormManyShiftsBody
    ): ScheduleFormManyShiftsSubmitResult => {
      setBody(fieldValues);
      show({ content: "Schedules created" });
      return {
        status: "success",
      };
    },
    [show]
  );

  const submit = useCallback(() => {
    ref?.current?.submit();
  }, [ref]);

  return (
    <>
      <AlphaCard>
        <ScheduleFormManyShifts
          data={data}
          allowEditing={allowEditing}
          onSubmit={onSubmit}
          ref={ref}
        />

        <Button onClick={submit}>Submit</Button>
      </AlphaCard>
      <div>
        <pre>{JSON.stringify(body, null, 2)}</pre>
      </div>
    </>
  );
};

const initData: ScheduleFormManyShiftsBody = {
  days: ["monday"],
  end: addMonths(setMinutes(setHours(new Date(), 16), 0), 1),
  start: setMinutes(setHours(new Date(), 10), 0),
  tag: ShiftTag.all_day,
};

const meta = {
  title: "Components/Schedule/ScheduleCalendar",
  component: MockComponent,
  argTypes: {},
} satisfies Meta<typeof MockComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicCreateShifts: Story = {
  args: {
    data: initData,
    allowEditing: { tag: true },
  },
};
export const BasicEditShifts: Story = {
  args: {
    data: initData,
  },
};
