import { endOfMonth } from "date-fns";
import { forwardRef, useCallback, useMemo } from "react";
import { ShiftDayItem, ShiftTag } from "~/api/model";
import { HelperDate } from "~/helpers/helper-date";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";
import {
  ScheduleFormManyShifts,
  ScheduleFormManyShiftsBody,
  ScheduleFormManyShiftsRefMethod,
  ScheduleFormManyShiftsSubmitResult,
} from "../schedule-form-many-shifts";

export interface ScheduleModalCreateManyShiftsProps {
  date: Date;
  staff: string;
}

export const ScheduleModalCreateManyShifts = forwardRef<
  ScheduleFormManyShiftsRefMethod,
  ScheduleModalCreateManyShiftsProps
>(({ date, staff }, ref) => {
  const { show } = useToast();
  const { createGroup } = useStaffScheduleCreateGroup({ staff });
  const { t } = useTranslation({
    id: "schedule-modal-create-many-shifts",
    locales,
  });

  const onSubmit = useCallback(
    (
      fieldValues: ScheduleFormManyShiftsBody
    ): ScheduleFormManyShiftsSubmitResult => {
      createGroup(fieldValues);
      show({ content: t("success") });
      return { status: "success" };
    },
    [createGroup, show, t]
  );

  const initData: ScheduleServiceCreateGroupBodyProps = useMemo(
    () => ({
      days: [
        date
          .toLocaleString("en-US", {
            weekday: "long",
          })
          .toLowerCase() as ShiftDayItem,
      ],
      end: HelperDate.resetDateTime(endOfMonth(date), 16),
      start: HelperDate.resetDateTime(date, 10),
      tag: ShiftTag.all_day,
    }),
    [date]
  );

  return (
    <ScheduleFormManyShifts
      data={initData}
      onSubmit={onSubmit}
      ref={ref}
      allowEditing={{ tag: true }}
    />
  );
});

const locales = {
  da: {
    success: "Vagtplaner oprettet",
  },
  en: {
    success: "Shifts created",
  },
};
