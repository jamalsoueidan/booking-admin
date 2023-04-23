import { ActionFunctionArgs } from "react-router-dom";
import {
  getUserShiftGetAllQueryKey,
  userShiftDestroyGroup,
} from "~/api/bookingShopifyApi";
import { ShiftType } from "~/components/shift-form";
import { queryClient } from "~/providers/query-provider";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = Object.fromEntries(await request.formData());
    const type = formData.shiftType as ShiftType;
    const { userId, groupId } = formData as never;
    if (type === "group") {
      console.log(userId, groupId);
      await userShiftDestroyGroup(userId, groupId);
      queryClient.invalidateQueries({
        queryKey: getUserShiftGetAllQueryKey(userId, null as never),
      });
    }
  } catch (error) {
    console.log(error);
  }

  console.log("delete shift delete");

  return {};
};
