import { LoaderFunctionArgs } from "react-router-dom";
import { getUserShiftGetByIdQueryOptions } from "~/api/bookingShopifyApi";
import { scheduleGetQueries } from "~/components/schedule-calendar";
import { queryClient } from "~/providers/query-provider";
import { ExtractTData } from "~/types/api";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = params.userId || "";
  const { selectedShiftId } = scheduleGetQueries(request.url);

  const query = getUserShiftGetByIdQueryOptions(userId, selectedShiftId);

  const response =
    queryClient.getQueryData<
      ExtractTData<typeof getUserShiftGetByIdQueryOptions>
    >(query.queryKey, { stale: false }) ??
    (await queryClient.fetchQuery(query));

  return response.data.payload;
};
