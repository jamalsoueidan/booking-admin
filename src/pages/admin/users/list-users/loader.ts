import { getUserGetAllQueryOptions } from "~/api/bookingShopifyApi";

import { queryClient } from "~/providers/query-provider";

export const loader = async () => {
  const data = await queryClient.fetchQuery(getUserGetAllQueryOptions());
  return data.data.payload;
};
