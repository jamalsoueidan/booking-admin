import { LoaderFunctionArgs } from "react-router-dom";
import {
  getUserShiftGetByIdQueryOptions,
  getUserShiftGetGroupQueryOptions,
} from "~/api/bookingShopifyApi";
import { scheduleGetQueries } from "~/components/schedule-calendar";
import { queryClient } from "~/providers/query-provider";
import { ExtractTData } from "~/types/api";

export const loadShiftGroup = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
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

export const loadShift = async ({ request, params }: LoaderFunctionArgs) => {
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

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { selectedGroupId } = scheduleGetQueries(request.url);

  if (!selectedGroupId) {
    return loadShift({ request, params });
  }

  return loadShiftGroup({ request, params });
};
