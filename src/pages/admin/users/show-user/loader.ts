import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import { LoaderFunctionArgs } from "react-router-dom";

import { getUserShiftGetAllQueryOptions } from "~/api/bookingShopifyApi";
import { deferredLoader } from "~/lib/loader-data";
import { queryClient } from "~/providers/query-provider";
import { ExtractTData } from "~/types/api";
import { loader as loadUser } from "../edit-user";

export const getShiftsSearchParams = ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  return {
    start: start ? startOfDay(new Date(start)) : startOfMonth(new Date()),
    end: end ? endOfDay(new Date(end)) : endOfMonth(new Date()),
  };
};

export const loadShifts = async ({ request, params }: LoaderFunctionArgs) => {
  const query = getUserShiftGetAllQueryOptions(
    params.userId || "",
    getShiftsSearchParams({ request, params })
  );

  const response =
    queryClient.getQueryData<
      ExtractTData<typeof getUserShiftGetAllQueryOptions>
    >(query.queryKey, { stale: false }) ??
    (await queryClient.fetchQuery(query));

  return response.data.payload;
};

export const loader = deferredLoader((props: LoaderFunctionArgs) => {
  return { user: loadUser(props), shifts: loadShifts(props) };
});
