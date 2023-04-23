import { AxiosError } from "axios";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import {
  getUserGetByIdQueryKey,
  userUpdateById,
} from "~/api/bookingShopifyApi";
import { queryClient } from "~/providers/query-provider";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const response = await userUpdateById(
      params.userId || "",
      Object.fromEntries(formData) as any
    );

    /*queryClient.invalidateQueries({
      queryKey: getUserGetByIdQueryKey(params.userId || ""),
    });*/

    queryClient.setQueriesData(
      getUserGetByIdQueryKey(params.userId || ""),
      response
    );
    // needs to handle it via toast
    return redirect(`../user/${params.userId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return error;
  }
};
