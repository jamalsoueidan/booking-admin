import { DatesSetArg, EventClickArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { endOfDay } from "date-fns";
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
    (props: DatesSetArg) => {
      const { currentStart } = props.view;
      const date = endOfDay(currentStart).toISOString().substring(0, 10);
      if (!firstRender.current) {
        updateQuery({
          date,
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
      const date = getQuery("date");
      return date ? new Date(date) : new Date();
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
