import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";

export const scheduleGetSearchParams = (url: string) => {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  const startStr = searchParams.get("start");
  const endStr = searchParams.get("end");
  const start = startStr
    ? startOfDay(new Date(startStr))
    : startOfMonth(new Date());
  const end = endStr ? endOfDay(new Date(endStr)) : endOfMonth(new Date());
  return {
    start,
    end,
    selectedShiftId: searchParams.get("selectedShiftId") || "",
    selectedGroupId: searchParams.get("selectedGroupId"),
  };
};
