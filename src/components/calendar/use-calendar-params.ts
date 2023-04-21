import { DatesSetArg, EventClickArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { addMonths, startOfMonth } from "date-fns";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export type CalendarParams = {
  start: string;
  end: string;
  selectedDate?: string;
};

export const useCalendarParams = () => {
  const [search, setSearch] = useSearchParams();
  const firstRender = useRef<boolean>(true);

  const onDatesSet = useCallback(
    ({ startStr, endStr }: DatesSetArg) => {
      const start = startStr.substring(0, 10);
      const end = endStr.substring(0, 10);
      if (!firstRender.current) {
        console.log("setSearch onDatesSet");
        setSearch({
          start,
          end,
        });
      }
    },
    [setSearch]
  );

  const onDateClick = useCallback(
    ({ dateStr: selectedDate }: DateClickArg) => {
      console.log("onDateclick");
      setSearch({
        selectedDate,
      });
    },
    [setSearch]
  );

  const onEventClick = useCallback(
    (args: EventClickArg) => {
      setSearch({ selectedEvent: args.event._def.extendedProps._id });
    },
    [setSearch]
  );

  const initialDate = useMemo(() => {
    const start = search.get("start");
    if (start) {
      return addMonths(new Date(start), 1);
    }

    return startOfMonth(new Date());
  }, [search]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  useEffect(() => {
    console.log(search.get("search"));
  }, [search]);

  return {
    onDatesSet,
    onDateClick,
    onEventClick,
    initialDate,
  };
};
