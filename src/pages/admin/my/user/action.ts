import { AxiosError } from "axios";
import { ActionFunctionArgs } from "react-router-dom";
import { userUpdateById } from "~/api/bookingShopifyApi";
import { BadResponseResponse } from "~/api/model";
import { getToken } from "~/providers/ability-provider";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const user = getToken();
    const formData = await request.formData();
    const response = await userUpdateById(
      user.userId,
      Object.fromEntries(formData) as never
    );

    return response.data.payload;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data as BadResponseResponse;
    }
  }
};
