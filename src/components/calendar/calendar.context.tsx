import { createContext } from "react";

import FullCalendar from "@fullcalendar/react";

export type CalendarContextValues = {
  calendar: FullCalendar | null;
};

export const CalendarContext = createContext<CalendarContextValues>({} as any);
