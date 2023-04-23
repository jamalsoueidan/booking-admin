import { AxiosError } from "axios";
import { ActionFunctionArgs } from "react-router-dom";
import { BadResponseResponse } from "~/api/model";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = Object.fromEntries(await request.formData());
    console.log(formData);
    return null;
    /*if (formData.days) {
      // form.days is coming as "wednesday,thursday", useSubmit from react-router convert that.
      response = await userShiftCreateGroup(params.userId || "", {
        ...formData,
        days: (formData.days as string).split(","),
      } as never);
    } else {
      response = await userShiftCreate(params.userId || "", formData as never);
    }
    return response.data.payload;*/
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data as BadResponseResponse;
    }
    return error as AxiosError;
  }
};
