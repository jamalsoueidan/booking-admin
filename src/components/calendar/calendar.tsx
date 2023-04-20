import { CalendarOptions as CO, DatesSetArg } from "@fullcalendar/core";
import da from "@fullcalendar/core/locales/da";
import en from "@fullcalendar/core/locales/en-gb";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDate } from "~/hooks/use-date";
import { useSettings } from "~/providers/setting-provider";
import { CalendarContext } from "./calendar.context";

export type CalendarDate = {
  start: Date;
  end: Date;
};

export type CalendarView =
  | "multiMonthYear"
  | "dayGridMonth"
  | "timeGridWeek"
  | "timeGridDay"
  | "listWeek";

export type CalendarOptions = Omit<CO, "events"> & {
  events?: Array<CalendarDate>;
  children: JSX.Element;
};

const initialDate = new Date();
export const Calendar = ({ children, ...props }: CalendarOptions) => {
  const calendar = useRef<FullCalendar>(null);
  const [, updateState] = useState<any>();
  const { language } = useSettings();
  const { toTimeZone } = useDate();
  const [searchParams, setSearchParams] = useSearchParams();

  const events = useMemo(
    () =>
      props.events?.map((e: { end: Date; start: Date }) => ({
        ...e,
        end: toTimeZone(e.end),
        start: toTimeZone(e.start),
      })),
    [props.events, toTimeZone]
  );

  const onDatesSet = useCallback(
    ({ startStr, endStr }: DatesSetArg) => {
      const paramsStart = searchParams.get("start");
      const paramsEnd = searchParams.get("end");
      const start = startStr.substring(0, 10);
      const end = endStr.substring(0, 10);
      if (start !== paramsStart && end !== paramsEnd) {
        searchParams.set("start", start);
        searchParams.set("end", end);
        setSearchParams(searchParams);
      }
    },
    [searchParams]
  );

  const locale = useMemo(() => [da, en], [da, en]);

  useEffect(() => {
    if (calendar?.current) {
      updateState({});
    }
  }, []);

  return (
    <CalendarContext.Provider value={{ calendar: calendar?.current }}>
      {calendar?.current && children}
      <FullCalendar
        ref={calendar}
        height="auto"
        plugins={[
          timeGridPlugin,
          dayGridPlugin,
          interactionPlugin,
          listPlugin,
          multiMonthPlugin,
        ]}
        firstDay={1}
        datesSet={onDatesSet}
        dayMaxEvents
        slotDuration="00:15:00"
        slotLabelFormat={[
          {
            hour: "numeric",
            meridiem: "short",
            minute: "2-digit",
            omitZeroMinute: false,
          },
        ]}
        eventDisplay="block"
        slotMinTime="07:00"
        slotMaxTime="20:00"
        locales={locale}
        locale={language}
        buttonText={{
          next: ">>",
          prev: "<<",
        }}
        events={events}
        headerToolbar={
          props.headerToolbar || {
            center: "title",
            left: "today prev,next",
            right:
              "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }
        }
        initialView={props.initialView || "dayGridMonth"}
      />
    </CalendarContext.Provider>
  );
};
