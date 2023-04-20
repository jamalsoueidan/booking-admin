import { DatesSetArg, EventClickArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { addMonths, startOfMonth } from "date-fns";
import { useCallback, useMemo } from "react";
import { useParams } from "~/providers/params-provider";

export type CalendarParams = {
  start: string;
  end: string;
  selectedDate?: string;
};

export const useCalendarParams = () => {
  const { params, setParams, updateParams } = useParams([
    "start",
    "end",
    "selectedDate",
    "selectedEvent",
  ]);

  const onDatesSet = useCallback(({ startStr, endStr }: DatesSetArg) => {
    const start = startStr.substring(0, 10);
    const end = endStr.substring(0, 10);
    setParams({
      start,
      end,
    });
  }, []);

  const onDateClick = useCallback(({ dateStr: selectedDate }: DateClickArg) => {
    updateParams({
      selectedDate,
    });
  }, []);

  const onEventClick = useCallback((args: EventClickArg) => {
    updateParams({ selectedEvent: args.event._def.extendedProps._id });
  }, []);

  const initialDate = useMemo(() => {
    if (params.start) {
      return addMonths(new Date(params.start), 1);
    }

    return startOfMonth(new Date());
  }, [params.start]);

  return {
    onDatesSet,
    onDateClick,
    onEventClick,
    initialDate,
  };
};
