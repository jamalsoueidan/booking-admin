import { EventContentArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { Text } from "@shopify/polaris";
import { useCallback, useMemo } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Shift } from "~/api/model";
import { Calendar } from "~/components/calendar";
import { useDate } from "~/hooks/use-date";
import { useSearchQuery } from "~/hooks/use-search-query";
import { useTag } from "~/hooks/use-tag";

export type ScheduleCalendarProps = {
  data: Array<Shift>;
  children: JSX.Element;
};

export const ScheduleCalendarCore = ({
  data,
  children,
}: ScheduleCalendarProps) => {
  const { format } = useDate();
  const navigate = useNavigate();
  const { query } = useSearchQuery();
  const { selectTagLabel, selectTagBackgroundColor, selectTagColor } = useTag();

  const events = useMemo(
    () =>
      data?.map((shift) => ({
        backgroundColor: selectTagBackgroundColor(shift.tag),
        color: selectTagBackgroundColor(shift.tag),
        end: shift.end,
        extendedProps: shift,
        start: shift.start,
      })) || [],
    [data, selectTagBackgroundColor]
  );

  const renderItem = useCallback(
    (arg: EventContentArg) => {
      const hour = arg?.event?.start && arg?.event.end && (
        <i>
          {format(arg.event.start, "p")}
          {" - "}
          {format(arg.event.end, "p")}
        </i>
      );

      const shift: Shift = arg.event.extendedProps as Shift;

      return (
        <div
          style={{
            color: selectTagColor(shift.tag),
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            padding: "5px",
          }}
        >
          <Text variant="bodyMd" as="span" fontWeight="semibold">
            {selectTagLabel(shift.tag)}
          </Text>
          <Text variant="bodySm" as="span">
            {hour}
          </Text>
        </div>
      );
    },
    [format, selectTagColor, selectTagLabel]
  );

  const validRange = useCallback((start: Date) => ({ start }), []);

  const onDateClick = useCallback(
    ({ dateStr: selectedDate }: DateClickArg) => {
      console.log(query);
      navigate({
        pathname: "create-shift",
        search: createSearchParams({ ...query, selectedDate }).toString(),
      });
    },
    [navigate, query]
  );

  return (
    <Calendar
      events={events}
      eventContent={renderItem}
      headerToolbar={{
        center: undefined,
        left: undefined,
        right: undefined,
      }}
      dateClick={onDateClick}
      validRange={validRange}
      initialView="dayGridMonth"
    >
      {children}
    </Calendar>
  );
};
