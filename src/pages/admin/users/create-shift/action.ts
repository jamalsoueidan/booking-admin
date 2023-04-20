import { AxiosError } from "axios";
import { ActionFunctionArgs } from "react-router-dom";
import { userShiftCreate } from "~/api/bookingShopifyApi";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  try {
    const formData = Object.fromEntries(await request.formData());
    return await userShiftCreate(params.userId || "", formData as any);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return error;
  }
};
