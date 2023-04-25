import { AxiosError } from "axios";
import { ActionFunctionArgs } from "react-router-dom";
import {
  getUserShiftGetAllQueryKey,
  getUserShiftGetGroupQueryKey,
  userShiftUpdateGroup,
} from "~/api/bookingShopifyApi";
import { BadResponseResponse } from "~/api/model";
import { scheduleGetQueries } from "~/components/schedule-calendar";
import { queryClient } from "~/providers/query-provider";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const userId = params.userId || "";
  const { selectedGroupId } = scheduleGetQueries(request.url);

  try {
    const formData = Object.fromEntries(await request.formData());

    // form.days is coming as "wednesday,thursday", useSubmit from react-router convert that.
    const response = await userShiftUpdateGroup(userId, selectedGroupId, {
      ...formData,
      days: (formData.days as string).split(","),
    } as never);

    queryClient.invalidateQueries(
      getUserShiftGetGroupQueryKey(userId, selectedGroupId)
    );

    await queryClient.invalidateQueries(
      getUserShiftGetAllQueryKey(userId, null as never)
    );

    return response.data.payload;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data as BadResponseResponse;
    }
  }
};
