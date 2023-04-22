import { createContext } from "react";

import FullCalendar from "@fullcalendar/react";

export type CalendarContextValues = {
  calendar?: FullCalendar;
  updateState: (v: any) => void;
};

export const CalendarContext = createContext<CalendarContextValues>({} as any);
