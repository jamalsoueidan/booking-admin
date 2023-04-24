import { LoaderFunctionArgs } from "react-router-dom";
import {
  getUserShiftGetByIdQueryOptions,
  getUserShiftGetGroupQueryOptions,
} from "~/api/bookingShopifyApi";
import { queryClient } from "~/providers/query-provider";
import { ExtractTData } from "~/types/api";

export const getSearchParams = ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;

  return {
    selectedShiftId: searchParams.get("selectedShiftId") || "",
    selectedGroupId: searchParams.get("selectedGroupId"),
  };
};

export const loadShiftGroup = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const userId = params.userId || "";
  const { selectedGroupId } = getSearchParams({ request, params });
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
  const { selectedShiftId } = getSearchParams({ request, params });

  const query = getUserShiftGetByIdQueryOptions(userId, selectedShiftId);

  const response =
    queryClient.getQueryData<
      ExtractTData<typeof getUserShiftGetByIdQueryOptions>
    >(query.queryKey, { stale: false }) ??
    (await queryClient.fetchQuery(query));

  return response.data.payload;
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { selectedGroupId } = getSearchParams({ request, params });

  if (!selectedGroupId) {
    return loadShift({ request, params });
  }

  return loadShiftGroup({ request, params });
};
