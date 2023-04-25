import { AxiosError } from "axios";
import { ActionFunctionArgs } from "react-router-dom";
import {
  getUserShiftGetAllQueryKey,
  getUserShiftGetByIdQueryKey,
  userShiftUpdate,
} from "~/api/bookingShopifyApi";
import { BadResponseResponse } from "~/api/model";
import { scheduleGetQueries } from "~/components/schedule-calendar";
import { queryClient } from "~/providers/query-provider";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const userId = params.userId || "";
  const { selectedShiftId } = scheduleGetQueries(request.url);

  try {
    const formData = Object.fromEntries(await request.formData());

    const response = await userShiftUpdate(
      userId,
      selectedShiftId,
      formData as never
    );

    // it self
    queryClient.invalidateQueries(
      getUserShiftGetByIdQueryKey(userId, selectedShiftId)
    );

    // all others
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
