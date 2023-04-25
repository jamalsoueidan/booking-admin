import { LoaderFunctionArgs } from "react-router-dom";

import { loader as loadUser } from "../edit-user";

export const loader = (props: LoaderFunctionArgs) => {
  return loadUser(props);
};
