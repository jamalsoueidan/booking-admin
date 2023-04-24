import { LoaderFunctionArgs } from "react-router-dom";
import { loader as editShiftLoader } from "../edit-shift";

export const loader = (props: LoaderFunctionArgs) => {
  return editShiftLoader(props);
};
