import { getUserGetByIdQueryOptions } from "~/api/bookingShopifyApi";
import { getToken } from "~/providers/ability-provider";
import { queryClient } from "~/providers/query-provider";

export const loader = async () => {
  const user = getToken();
  const response = await queryClient.fetchQuery(
    getUserGetByIdQueryOptions(user.userId)
  );
  return response.data.payload;
};
