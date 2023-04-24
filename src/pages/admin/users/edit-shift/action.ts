import { AxiosError } from "axios";
import { ActionFunctionArgs } from "react-router-dom";
import {
  getUserShiftGetAllQueryKey,
  getUserShiftGetByIdQueryKey,
  getUserShiftGetGroupQueryKey,
  userShiftUpdate,
  userShiftUpdateGroup,
} from "~/api/bookingShopifyApi";
import { BadResponseResponse } from "~/api/model";
import { queryClient } from "~/providers/query-provider";
import { getSearchParams } from "./loader";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const userId = params.userId || "";
  const { selectedGroupId, selectedShiftId } = getSearchParams({
    request,
    params,
  });

  try {
    const formData = Object.fromEntries(await request.formData());
    console.log(selectedGroupId, selectedShiftId, formData);
    let response;
    if (selectedGroupId) {
      // form.days is coming as "wednesday,thursday", useSubmit from react-router convert that.
      response = await userShiftUpdateGroup(userId, selectedGroupId, {
        ...formData,
        days: (formData.days as string).split(","),
      } as never);

      queryClient.invalidateQueries(
        getUserShiftGetGroupQueryKey(userId, selectedGroupId)
      );
    } else {
      response = await userShiftUpdate(
        userId,
        selectedShiftId,
        formData as never
      );

      queryClient.invalidateQueries(
        getUserShiftGetByIdQueryKey(userId, selectedShiftId)
      );
    }

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
