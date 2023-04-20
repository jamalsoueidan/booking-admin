import { useContext } from "react";
import { CalendarContext } from "./calendar.context";

export const useCalendar = () => {
  const { calendar } = useContext(CalendarContext);
  return calendar;
};
