import { CalendarOptions as CO } from "@fullcalendar/core";
import da from "@fullcalendar/core/locales/da";
import en from "@fullcalendar/core/locales/en-gb";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useCallback, useMemo, useState } from "react";
import { useDate } from "~/hooks/use-date";
import { useSettings } from "~/providers/setting-provider";
import { CalendarContext } from "./calendar.context";
import { useCalendarParams } from "./use-calendar-params";

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

export const Calendar = ({ children, ...props }: CalendarOptions) => {
  const [calendar, setCalendar] = useState<FullCalendar>();
  const [, updateState] = useState<any>();
  const { language } = useSettings();
  const { toTimeZone } = useDate();
  const { initialDate, onDatesSet, onDateClick, onEventClick } =
    useCalendarParams();

  const events = useMemo(
    () =>
      props.events?.map((e: { end: Date; start: Date }) => ({
        ...e,
        end: toTimeZone(e.end),
        start: toTimeZone(e.start),
      })),
    [props.events, toTimeZone]
  );

  const onRef = useCallback((ref: FullCalendar) => {
    if (ref) {
      setCalendar(ref);
    }
  }, []);

  const locale = useMemo(() => [da, en], [da, en]);

  return (
    <CalendarContext.Provider value={{ calendar, updateState }}>
      {children}
      <FullCalendar
        ref={onRef}
        height="auto"
        plugins={[
          timeGridPlugin,
          dayGridPlugin,
          interactionPlugin,
          listPlugin,
          multiMonthPlugin,
        ]}
        firstDay={1}
        initialDate={initialDate}
        datesSet={onDatesSet}
        eventClick={onEventClick}
        dateClick={onDateClick}
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
