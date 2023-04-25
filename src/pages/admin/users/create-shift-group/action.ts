import { AxiosError, AxiosResponse } from "axios";
import { eachMonthOfInterval } from "date-fns";
import { ActionFunctionArgs } from "react-router-dom";
import {
  getUserShiftGetAllQueryKey,
  userShiftCreateGroup,
} from "~/api/bookingShopifyApi";
import {
  BadResponseResponse,
  Errors,
  Shift,
  ShiftGetAllResponse,
} from "~/api/model";
import { shiftCreateStartEnd } from "~/lib/shift";
import { queryClient } from "~/providers/query-provider";

export const isActionSuccess = (
  actionData: Shift | Shift[] | Errors | undefined
): actionData is Shift | Shift[] => {
  if (!actionData || Array.isArray((actionData as Errors).errors)) {
    return false;
  }

  return true;
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  try {
    const formData = Object.fromEntries(await request.formData());
    const userId = params.userId || "";

    const start = new Date(formData.start as string);
    const end = new Date(formData.end as string);

    // form.days is coming as "wednesday,thursday", useSubmit from react-router convert that.
    const response = await userShiftCreateGroup(userId || "", {
      ...formData,
      days: (formData.days as string).split(","),
    } as never);

    /* Code below is a test instead of invalidating the data, gives better user-experience */
    const monthInterval = eachMonthOfInterval({
      start,
      end,
    });

    monthInterval.forEach((startMonth) => {
      console.log(
        getUserShiftGetAllQueryKey(userId, shiftCreateStartEnd(startMonth))
      );
      queryClient.setQueryData(
        getUserShiftGetAllQueryKey(userId, shiftCreateStartEnd(startMonth)),
        (data: AxiosResponse<ShiftGetAllResponse, never> | undefined) => {
          if (data) {
            data.data.payload = [
              ...data.data.payload,
              ...response.data.payload,
            ];
          }
          return data;
        }
      );
    });

    return response.data.payload;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data as BadResponseResponse;
    }
  }
};
