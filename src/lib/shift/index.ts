import { addDays, addMonths, startOfDay, subDays } from "date-fns";
import { LoaderFunctionArgs } from "react-router-dom";

export const shiftCreateStartEnd = (date: Date) => {
  return {
    start: subDays(startOfDay(date), 7),
    end: addDays(addMonths(startOfDay(date), 1), 12),
  };
};

export const shiftFormData = async (request: LoaderFunctionArgs["request"]) => {
  const form = await request.formData();
  const formStart = form.get("start") as string;
  const formEnd = form.get("end") as string;
  const start = formStart ? new Date(formStart) : new Date();
  const end = formEnd ? new Date(formEnd) : new Date();

  return {
    start,
    end,
  };
};
