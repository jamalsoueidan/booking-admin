import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ScheduleCalendarCore, ScheduleCalendarProps } from "./schedule-core";
import { ScheduleHeader } from "./schedule-header";

export const ScheduleCalendar = (
  props: Pick<ScheduleCalendarProps, "data">
) => {
  const [search] = useSearchParams();

  const dataFilteredByTag = useMemo(
    () =>
      search.get("tag")
        ? props?.data.filter((d) => d.tag === search.get("tag"))
        : props?.data,
    [search]
  );

  return (
    <ScheduleCalendarCore data={dataFilteredByTag}>
      <ScheduleHeader />
    </ScheduleCalendarCore>
  );
};
