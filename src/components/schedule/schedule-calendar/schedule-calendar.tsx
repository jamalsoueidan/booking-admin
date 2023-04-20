import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ScheduleCalendarCore, ScheduleCalendarProps } from "./schedule-core";
import { ScheduleHeader } from "./schedule-header";

export const ScheduleCalendar = (
  props: Pick<ScheduleCalendarProps, "data">
) => {
  const [searchParams] = useSearchParams();

  const dataFilteredByTag = useMemo(() => {
    const tag = searchParams.get("tag");
    return tag ? props?.data.filter((d) => d.tag === tag) : props?.data;
  }, [searchParams.get("tag")]);

  return (
    <ScheduleCalendarCore data={dataFilteredByTag}>
      <ScheduleHeader />
    </ScheduleCalendarCore>
  );
};
