import { Text } from "@shopify/polaris";
import { addDays, addMonths } from "date-fns";
import { useDate } from "~/hooks/use-date";
import { useCalendar } from "./use-calendar";

export const CalendarTitle = () => {
  const { calendar } = useCalendar();
  const { format } = useDate();

  const view = calendar?.getApi().view;
  const mode = view?.type || "dayGridMonth";
  const currentStart = view?.currentStart || new Date();

  const activeStart = view?.activeStart || new Date();
  const activeEnd = view?.activeEnd || addMonths(activeStart, 1);

  if (mode === "multiMonthYear") {
    return (
      <Text as="h1" variant="heading2xl">
        <span style={{ textTransform: "capitalize" }}>
          {format(currentStart, "MMMM yyyy")}
        </span>
      </Text>
    );
  }

  if (mode === "dayGridMonth") {
    return (
      <Text as="h1" variant="heading2xl">
        <span style={{ textTransform: "capitalize" }}>
          {format(currentStart, "MMMM yyyy")}
        </span>
      </Text>
    );
  }

  if (mode === "timeGridWeek") {
    return (
      <Text as="h1" variant="heading2xl">
        {format(activeStart, "PP")} - {format(addDays(activeEnd, 6), "PP")}
      </Text>
    );
  }

  if (mode === "timeGridDay") {
    return (
      <Text as="h1" variant="heading2xl">
        {format(currentStart, "PPP")}
      </Text>
    );
  }

  return (
    <Text as="h1" variant="heading2xl">
      {format(activeStart, "PP")} - {format(addDays(activeEnd, 6), "PP")}
    </Text>
  );
};
