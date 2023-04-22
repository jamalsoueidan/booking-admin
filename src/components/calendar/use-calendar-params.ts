import { DatesSetArg, EventClickArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { eachMonthOfInterval } from "date-fns";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchQuery } from "~/hooks/use-search-query";

export type CalendarParams = {
  start: string;
  end: string;
  selectedDate?: string;
};

export const useCalendarParams = () => {
  const { updateQuery, getQuery } = useSearchQuery();
  const firstRender = useRef<boolean>(true);

  const onDatesSet = useCallback(
    ({ startStr, endStr }: DatesSetArg) => {
      const start = startStr.substring(0, 10);
      const end = endStr.substring(0, 10);
      if (!firstRender.current) {
        updateQuery({
          start,
          end,
        });
      }
    },
    [updateQuery]
  );

  const onDateClick = useCallback(
    ({ dateStr: selectedDate }: DateClickArg) => {
      updateQuery({
        selectedDate,
      });
    },
    [updateQuery]
  );

  const onEventClick = useCallback(
    (args: EventClickArg) => {
      updateQuery({ selectedEvent: args.event._def.extendedProps._id });
    },
    [updateQuery]
  );

  const initialDate = useMemo(() => {
    if (firstRender.current) {
      const start = getQuery("start");
      const end = getQuery("end");
      const result = eachMonthOfInterval({
        start: start ? new Date(start) : new Date(),
        end: end ? new Date(end) : new Date(),
      });
      return middleItem(result) || new Date();
    }
  }, [getQuery]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return {
    onDatesSet,
    onDateClick,
    onEventClick,
    initialDate,
  };
};

function middleItem(arr: Date[]) {
  if (arr.length === 0) {
    return null;
  } else if (arr.length === 2) {
    return arr[0];
  } else {
    return arr[Math.floor(arr.length / 2)];
  }
}
