import { AxiosError } from "axios";
import { ActionFunctionArgs } from "react-router-dom";
import { userShiftCreate } from "~/api/bookingShopifyApi";
import { BadResponseResponse } from "~/api/model";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  console.log("executed");
  try {
    const formData = Object.fromEntries(await request.formData());
    const response = await userShiftCreate(
      params.userId || "",
      formData as any
    );
    return response.data.payload;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data as BadResponseResponse;
    }
    return error as AxiosError;
  }
};
