import { ActionFunctionArgs } from "react-router-dom";
import {
  getUserShiftGetAllQueryKey,
  userShiftDestroy,
  userShiftDestroyGroup,
} from "~/api/bookingShopifyApi";
import { ShiftType } from "~/components/shift-form";
import { queryClient } from "~/providers/query-provider";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData());
  const type = formData.shiftType as ShiftType;
  const { userId, groupId, _id } = formData as never;
  if (type === "group") {
    const response = await userShiftDestroyGroup(userId, groupId);
    await queryClient.invalidateQueries({
      queryKey: getUserShiftGetAllQueryKey(userId, null as never),
    });
    return response;
  }

  const response = await userShiftDestroy(userId, _id);
  await queryClient.invalidateQueries({
    queryKey: getUserShiftGetAllQueryKey(userId, null as never),
  });
  return response;
};
