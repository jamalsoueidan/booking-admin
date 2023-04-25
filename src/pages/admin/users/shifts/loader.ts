import { LoaderFunctionArgs } from "react-router-dom";

import { getUserShiftGetAllQueryOptions } from "~/api/bookingShopifyApi";
import { scheduleGetQueries } from "~/components/schedule-calendar";
import { deferredLoader } from "~/lib/loader-data";
import { shiftCreateStartEnd } from "~/lib/shift";
import { queryClient } from "~/providers/query-provider";
import { ExtractTData } from "~/types/api";

export const loadShifts = async ({ request, params }: LoaderFunctionArgs) => {
  const { date } = scheduleGetQueries(request.url);
  const query = getUserShiftGetAllQueryOptions(
    params.userId || "",
    shiftCreateStartEnd(date)
  );

  const response =
    queryClient.getQueryData<
      ExtractTData<typeof getUserShiftGetAllQueryOptions>
    >(query.queryKey, { stale: false }) ??
    (await queryClient.fetchQuery(query));

  return response.data.payload;
};

export const loader = deferredLoader((props: LoaderFunctionArgs) => {
  return { shifts: loadShifts(props) };
});
