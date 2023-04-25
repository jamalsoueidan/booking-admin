import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";

export const scheduleGetQueries = (url: string) => {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  const startStr = searchParams.get("start");
  const endStr = searchParams.get("end");
  const start = startStr ? new Date(startStr) : new Date();
  const end = endStr ? new Date(endStr) : new Date();

  return {
    start: startOfMonth(startOfDay(start)),
    end: endOfMonth(endOfDay(end)),
    selectedShiftId: searchParams.get("selectedShiftId") || "",
    selectedGroupId: searchParams.get("selectedGroupId"),
  };
};
