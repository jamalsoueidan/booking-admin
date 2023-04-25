import { LoaderFunctionArgs } from "react-router-dom";
import { loader as loaderShiftGroup } from "./../edit-shift-group";

export const loader = (props: LoaderFunctionArgs) => {
  return loaderShiftGroup(props);
};
