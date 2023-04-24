import { AxiosResponse } from "axios";
import { ActionFunctionArgs } from "react-router-dom";
import {
  getUserShiftGetAllQueryKey,
  userShiftDestroy,
} from "~/api/bookingShopifyApi";
import { ShiftGetAllResponse } from "~/api/model";
import { scheduleGetSearchParams } from "~/components/schedule-calendar";
import { queryClient } from "~/providers/query-provider";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { selectedShiftId, start, end } = scheduleGetSearchParams(request.url);
  const userId = params.userId || "";

  // no need to wait
  userShiftDestroy(userId, selectedShiftId);

  /* Code below is a test instead of invalidating the data, gives better user-experience */
  queryClient.setQueryData(
    getUserShiftGetAllQueryKey(userId || "", {
      start: start.toJSON(),
      end: end.toJSON(),
    } as never),
    (data: AxiosResponse<ShiftGetAllResponse, never> | undefined) => {
      if (data) {
        console.log(data.data.payload.length);
        data.data.payload = data.data.payload.filter(
          (shift) => shift._id !== selectedShiftId
        );
        console.log(data.data.payload.length);
      }
      return data;
    }
  );

  return null;
};
