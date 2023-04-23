import { LoaderFunctionArgs } from "react-router-dom";
import { getUserShiftGetGroupQueryOptions } from "~/api/bookingShopifyApi";
import { queryClient } from "~/providers/query-provider";
import { ExtractTData } from "~/types/api";
import { loadShifts } from "../show-user";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const shifts = await loadShifts({ request, params });
  const shiftId = new URL(request.url).searchParams.get("selectedEvent") || "";
  const userId = params.userId || "";
  const shift = shifts.find((shift) => shift._id === shiftId);
  if (!shift) {
    throw new Response("Not Found", { status: 404 });
  }

  // return shift (not part of group)
  if (!shift.groupId) {
    return shift;
  }

  const query = getUserShiftGetGroupQueryOptions(userId, shift.groupId);

  const response =
    queryClient.getQueryData<
      ExtractTData<typeof getUserShiftGetGroupQueryOptions>
    >(query.queryKey, { stale: false }) ??
    (await queryClient.fetchQuery(query));

  const shiftGroup = response.data.payload;
  if (!shiftGroup) {
    throw new Response("Not Found", { status: 404 });
  }
  return shiftGroup;
};
