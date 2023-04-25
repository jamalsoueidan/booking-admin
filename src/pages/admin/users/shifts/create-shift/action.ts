import { AxiosError, AxiosResponse } from "axios";
import { ActionFunctionArgs } from "react-router-dom";
import {
  getUserShiftGetAllQueryKey,
  userShiftCreate,
} from "~/api/bookingShopifyApi";
import {
  BadResponseResponse,
  Errors,
  Shift,
  ShiftGetAllResponse,
} from "~/api/model";
import { scheduleGetQueries } from "~/components/schedule-calendar";
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
    const response = await userShiftCreate(userId || "", formData as never);

    /* Code below is a test instead of invalidating the data, gives better user-experience */
    const { date } = scheduleGetQueries(request.url);
    queryClient.setQueryData(
      getUserShiftGetAllQueryKey(userId || "", shiftCreateStartEnd(date)),
      (data: AxiosResponse<ShiftGetAllResponse, never> | undefined) => {
        if (data) {
          data.data.payload = [
            ...data.data.payload,
            ...(Array.isArray(response.data.payload)
              ? response.data.payload
              : [response.data.payload]),
          ];
        }
        return data;
      }
    );

    return response.data.payload;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data as BadResponseResponse;
    }
  }
};
