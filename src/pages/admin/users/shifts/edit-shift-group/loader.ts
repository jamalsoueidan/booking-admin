import { LoaderFunctionArgs } from "react-router-dom";
import { getUserShiftGetGroupQueryOptions } from "~/api/bookingShopifyApi";
import { scheduleGetQueries } from "~/components/schedule-calendar";
import { queryClient } from "~/providers/query-provider";
import { ExtractTData } from "~/types/api";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = params.userId || "";
  const { selectedGroupId } = scheduleGetQueries(request.url);
  const query = getUserShiftGetGroupQueryOptions(userId, selectedGroupId || "");
  const response =
    queryClient.getQueryData<
      ExtractTData<typeof getUserShiftGetGroupQueryOptions>
    >(query.queryKey, { stale: false }) ??
    (await queryClient.fetchQuery(query));

  return response.data.payload;
};
