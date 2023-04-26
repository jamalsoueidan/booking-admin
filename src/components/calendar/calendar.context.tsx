import { createContext } from "react";

import FullCalendar from "@fullcalendar/react";

export type CalendarContextValues = {
  calendar?: FullCalendar;
};

export const CalendarContext = createContext<CalendarContextValues>(
  {} as never
);
