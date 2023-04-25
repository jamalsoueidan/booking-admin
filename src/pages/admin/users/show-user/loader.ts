import { LoaderFunctionArgs } from "react-router-dom";

import {
  getUserShiftGetAllQueryKey,
  getUserShiftGetAllQueryOptions,
} from "~/api/bookingShopifyApi";
import { scheduleGetQueries } from "~/components/schedule-calendar";
import { deferredLoader } from "~/lib/loader-data";
import { queryClient } from "~/providers/query-provider";
import { ExtractTData } from "~/types/api";
import { loader as loadUser } from "../edit-user";

export const loadShifts = async ({ request, params }: LoaderFunctionArgs) => {
  const { start, end } = scheduleGetQueries(request.url);
  const query = getUserShiftGetAllQueryOptions(
    params.userId || "",
    {
      start,
      end,
    },
    {
      query: {
        queryKey: getUserShiftGetAllQueryKey(params.userId || "", {
          start: start.toJSON(),
          end: end.toJSON(),
        } as never),
      },
    }
  );
  console.log(query);

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
