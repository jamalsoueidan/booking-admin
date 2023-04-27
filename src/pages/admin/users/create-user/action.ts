import { AxiosError } from "axios";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { userCreate } from "~/api/bookingShopifyApi";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    await userCreate(Object.fromEntries(formData) as never);

    return redirect(`../user/${params.userId}/shifts`);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return error;
  }
};
