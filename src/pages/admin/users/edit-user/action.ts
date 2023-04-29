import { AxiosError } from "axios";
import { ActionFunctionArgs } from "react-router-dom";
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
      Object.fromEntries(formData) as never
    );

    queryClient.setQueriesData(
      getUserGetByIdQueryKey(params.userId || ""),
      response
    );
    return response.data.payload;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return error;
  }
};
