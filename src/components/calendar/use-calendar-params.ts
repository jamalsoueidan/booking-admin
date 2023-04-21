import { DatesSetArg, EventClickArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { addMonths } from "date-fns";
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
      if (start) {
        return addMonths(new Date(start), 1);
      }
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
