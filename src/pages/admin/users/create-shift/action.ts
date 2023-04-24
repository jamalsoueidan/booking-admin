import { AxiosError, AxiosResponse } from "axios";
import { ActionFunctionArgs } from "react-router-dom";
import {
  getUserShiftGetAllQueryKey,
  userShiftCreate,
  userShiftCreateGroup,
} from "~/api/bookingShopifyApi";
import {
  BadResponseResponse,
  Errors,
  Shift,
  ShiftCreateGroupResponse,
  ShiftCreateResponse,
  ShiftGetAllResponse,
} from "~/api/model";
import { scheduleGetSearchParams } from "~/components/schedule-calendar";
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
    const userId = params.userId || "";
    const formData = Object.fromEntries(await request.formData());
    let response: AxiosResponse<ShiftCreateGroupResponse | ShiftCreateResponse>;
    if (formData.days) {
      // form.days is coming as "wednesday,thursday", useSubmit from react-router convert that.
      response = await userShiftCreateGroup(userId || "", {
        ...formData,
        days: (formData.days as string).split(","),
      } as never);
    } else {
      response = await userShiftCreate(userId || "", formData as never);
    }

    /* Code below is a test instead of invalidating the data, gives better user-experience */
    const { start, end } = scheduleGetSearchParams(request.url);
    queryClient.setQueryData(
      getUserShiftGetAllQueryKey(userId || "", {
        start: start.toJSON(),
        end: end.toJSON(),
      } as never),
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
