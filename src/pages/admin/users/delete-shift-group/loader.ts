import { LoaderFunctionArgs } from "react-router-dom";
import { loadShift } from "../edit-shift";

export const loader = (props: LoaderFunctionArgs) => {
  return loadShift(props);
};
