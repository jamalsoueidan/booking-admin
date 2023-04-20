import { AlphaCard, Button } from "@shopify/polaris";
import { setHours, setMinutes } from "date-fns";
import { useCallback, useRef, useState } from "react";
import { ShiftTag } from "~/api/model";
import { useToast } from "~/providers/toast";
import {
  ScheduleFormOneShift,
  ScheduleFormOneShiftAllowEditing,
  ScheduleFormOneShiftBody,
  ScheduleFormOneShiftRefMethod,
  ScheduleFormOneShiftSubmitResult,
} from "./schedule-form-one-shift";

const MockComponent = ({
  data,
  allowEditing,
}: {
  data: ScheduleFormOneShiftBody;
  allowEditing?: ScheduleFormOneShiftAllowEditing;
}) => {
  const ref = useRef<ScheduleFormOneShiftRefMethod>(null);
  const { show } = useToast();
  const [body, setBody] = useState({});

  const onSubmit = useCallback(
    (
      fieldValues: ScheduleFormOneShiftBody
    ): ScheduleFormOneShiftSubmitResult => {
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
        <ScheduleFormOneShift
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

const initData: ScheduleFormOneShiftBody = {
  end: setMinutes(setHours(new Date(), 16), 0),
  start: setMinutes(setHours(new Date(), 10), 0),
  tag: ShiftTag.all_day,
};

export const BasicCreateOneShift = () => (
  <MockComponent data={initData} allowEditing={{ tag: true }} />
);

export const BasicEditOneShift = () => <MockComponent data={initData} />;
