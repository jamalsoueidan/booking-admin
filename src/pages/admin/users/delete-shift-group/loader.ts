import { LoaderFunctionArgs } from "react-router-dom";
import { loadShiftGroup } from "../edit-shift";

export const loader = (props: LoaderFunctionArgs) => {
  return loadShiftGroup(props);
};
