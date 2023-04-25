import { LoaderFunctionArgs } from "react-router-dom";
import { loader as loaderShift } from "./../edit-shift/loader";

export const loader = (props: LoaderFunctionArgs) => {
  return loaderShift(props);
};
