import { AxiosResponse } from "axios";
import { ActionFunctionArgs } from "react-router-dom";
import {
  getUserShiftGetAllQueryKey,
  userShiftDestroy,
} from "~/api/bookingShopifyApi";
import { ShiftGetAllResponse } from "~/api/model";
import { scheduleGetQueries } from "~/components/schedule-calendar";
import { shiftCreateStartEnd } from "~/lib/shift";
import { queryClient } from "~/providers/query-provider";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { selectedShiftId, date } = scheduleGetQueries(request.url);
  const userId = params.userId || "";

  // no need to wait
  userShiftDestroy(userId, selectedShiftId);

  /* Code below is a test instead of invalidating the data, gives better user-experience */
  queryClient.setQueryData(
    getUserShiftGetAllQueryKey(userId || "", shiftCreateStartEnd(date)),
    (data: AxiosResponse<ShiftGetAllResponse, never> | undefined) => {
      if (data) {
        data.data.payload = data.data.payload.filter(
          (shift) => shift._id !== selectedShiftId
        );
      }
      return data;
    }
  );

  return null;
};
