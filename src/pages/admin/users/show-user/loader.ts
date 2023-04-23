import { endOfMonth, startOfMonth } from "date-fns";
import { LoaderFunctionArgs } from "react-router-dom";

import { getUserShiftGetAllQueryOptions } from "~/api/bookingShopifyApi";
import { deferredLoader } from "~/lib/loaderData";
import { queryClient } from "~/providers/query-provider";
import { ExtractTData } from "~/types/api";
import { loader as loadUser } from "../edit-user";

export const loadShifts = async ({ request, params }: LoaderFunctionArgs) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const query = getUserShiftGetAllQueryOptions(params.userId || "", {
    start: start ? new Date(start) : startOfMonth(new Date()),
    end: end ? new Date(end) : endOfMonth(new Date()),
  });

  const response =
    queryClient.getQueryData<
      ExtractTData<typeof getUserShiftGetAllQueryOptions>
    >(query.queryKey) ?? (await queryClient.fetchQuery(query));

  return response.data.payload;
};

export const loader = deferredLoader((props: LoaderFunctionArgs) => {
  return { user: loadUser(props), shifts: loadShifts(props) };
});
