import { useCallback } from "react";
import { useDate } from "./use-date";

export const useConvertToUtc = () => {
  const { toUtc, formatInTimezone } = useDate();

  const convertToUtc = useCallback(
    (date: Date, time: string) => {
      const [hour, minuttes] = time.split(":").map((_) => parseInt(_, 10));
      return toUtc(
        new Date(
          `${formatInTimezone(date, "yyyy-MM-dd")} ${hour}:${minuttes}:00`
        )
      );
    },
    [formatInTimezone, toUtc]
  );

  return convertToUtc;
};
