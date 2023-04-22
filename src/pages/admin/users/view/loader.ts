import { endOfMonth, startOfMonth } from "date-fns";

import {
  getUserGetByIdQueryOptions,
  getUserShiftGetAllQueryOptions,
} from "~/api/bookingShopifyApi";
import { deferredLoader } from "~/lib/loaderData";
import { queryClient } from "~/providers/query-provider";

export const loader = deferredLoader(({ request, params }) => {
  const loadUser = async () => {
    const response = await queryClient.fetchQuery(
      getUserGetByIdQueryOptions(params.userId || "")
    );
    return response.data.payload;
  };

  const loadShifts = async () => {
    const searchParams = new URLSearchParams(request.url.split("?")[1]);
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const response = await queryClient.fetchQuery(
      getUserShiftGetAllQueryOptions(params.userId || "", {
        start: start ? new Date(start) : startOfMonth(new Date()),
        end: end ? new Date(end) : endOfMonth(new Date()),
      })
    );
    return response.data.payload;
  };

  return { user: loadUser(), shifts: loadShifts() };
});
