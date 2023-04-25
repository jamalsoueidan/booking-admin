import { AxiosResponse } from "axios";
import { ActionFunctionArgs } from "react-router-dom";
import {
  getUserShiftGetAllQueryKey,
  userShiftDestroyGroup,
} from "~/api/bookingShopifyApi";
import { ShiftGetAllResponse } from "~/api/model";
import { scheduleGetQueries } from "~/components/schedule-calendar";
import { queryClient } from "~/providers/query-provider";

export const formData = async (formData: () => Promise<FormData>) => {
  const form = await formData();
  return {
    userId: form.get("userId") || "",
    start: form.get("start") || "",
    end: form.get("end") || "",
  };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const form = await formData(request.formData);
  const { selectedGroupId, start, end } = scheduleGetQueries(request.url);
  const userId = params.userId || "";

  console.log(form.start, form.end, start, end);
  if (selectedGroupId) {
    userShiftDestroyGroup(userId, selectedGroupId);

    /* Code below is a test instead of invalidating the data, gives better user-experience */
    queryClient.setQueryData(
      getUserShiftGetAllQueryKey(userId || "", {
        start: start.toJSON(),
        end: end.toJSON(),
      } as never),
      (data: AxiosResponse<ShiftGetAllResponse, never> | undefined) => {
        if (data) {
          data.data.payload = data.data.payload.filter(
            (shift) => shift.groupId !== selectedGroupId
          );
        }
        return data;
      }
    );
  }

  return null;
};
