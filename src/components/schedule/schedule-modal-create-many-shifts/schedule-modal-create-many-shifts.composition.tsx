import { Button } from "@shopify/polaris";
import { useCallback, useRef } from "react";
import { ScheduleFormManyShiftsRefMethod } from "../schedule-form-many-shifts";
import { ScheduleModalCreateManyShifts } from "./schedule-modal-create-many-shifts";

export const BasicScheduleModalCreateManyShifts = () => {
  const ref = useRef<ScheduleFormManyShiftsRefMethod>(null);
  const { data } = useStaff();

  const submit = useCallback(() => {
    ref.current?.submit();
  }, []);

  if (!data) {
    return <>Loading</>;
  }
  return (
    <>
      <ScheduleModalCreateManyShifts
        ref={ref}
        date={new Date()}
        staff={data[0]._id}
      />
      <Button onClick={submit}>Submit</Button>
    </>
  );
};
