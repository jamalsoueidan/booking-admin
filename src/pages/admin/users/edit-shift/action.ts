import { ActionFunctionArgs } from "react-router-dom";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  console.log("executed");
};
