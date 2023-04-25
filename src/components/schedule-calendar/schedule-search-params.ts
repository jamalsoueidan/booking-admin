import { startOfMonth } from "date-fns";

export const scheduleGetQueries = (url: string) => {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  const dateStr = searchParams.get("date");
  const date = dateStr ? new Date(dateStr) : startOfMonth(new Date());

  return {
    date,
    selectedShiftId: searchParams.get("selectedShiftId") || "",
    selectedGroupId: searchParams.get("selectedGroupId"),
  };
};
