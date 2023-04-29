import { AxiosError } from "axios";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { userCreate } from "~/api/bookingShopifyApi";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const response = await userCreate(Object.fromEntries(formData) as never);

    return redirect(`../user/${response.data.payload._id}/shifts`);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return error;
  }
};
