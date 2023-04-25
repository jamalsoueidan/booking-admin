import { AxiosResponse } from "axios";
import { eachMonthOfInterval } from "date-fns";
import { ActionFunctionArgs } from "react-router-dom";
import {
  getUserShiftGetAllQueryKey,
  userShiftDestroyGroup,
} from "~/api/bookingShopifyApi";
import { ShiftGetAllResponse } from "~/api/model";
import { scheduleGetQueries } from "~/components/schedule-calendar";
import { shiftCreateStartEnd, shiftFormData } from "~/lib/shift";
import { queryClient } from "~/providers/query-provider";

export type cleanUp = {
  userId: string;
  selectedGroupId: string;
  start: Date;
  end: Date;
};

export const cleanup = ({ userId, selectedGroupId, start, end }: cleanUp) => {
  const monthInterval = eachMonthOfInterval({
    start,
    end,
  });

  monthInterval.forEach((startMonth) => {
    queryClient.setQueryData(
      getUserShiftGetAllQueryKey(userId, shiftCreateStartEnd(startMonth)),
      (data: AxiosResponse<ShiftGetAllResponse, never> | undefined) => {
        if (data) {
          data.data.payload = data.data.payload.filter(
            (shift) => shift.groupId !== selectedGroupId
          );
        }
        return data;
      }
    );
  });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const form = await shiftFormData(request);
  const { selectedGroupId } = scheduleGetQueries(request.url);
  const userId = params.userId || "";

  if (selectedGroupId) {
    //destroy
    userShiftDestroyGroup(userId, selectedGroupId);

    /* Code below is a test instead of invalidating the data, gives better user-experience */
    cleanup({ userId, selectedGroupId, start: form.start, end: form.end });
  }

  return null;
};
