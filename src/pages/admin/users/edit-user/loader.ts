import { LoaderFunctionArgs } from "react-router-dom";
import { getUserGetByIdQueryOptions } from "~/api/bookingShopifyApi";
import { queryClient } from "~/providers/query-provider";
import { ExtractTData } from "~/types/api";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const query = getUserGetByIdQueryOptions(params.userId || "");

  const response =
    queryClient.getQueryData<ExtractTData<typeof getUserGetByIdQueryOptions>>(
      query.queryKey,
      { stale: false }
    ) ?? (await queryClient.fetchQuery(query));
  return response.data.payload;
};
