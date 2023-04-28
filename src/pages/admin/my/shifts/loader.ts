import { LoaderFunctionArgs } from "react-router-dom";

import { loader as loadUser } from "~/pages/admin/users/show-user";

export const loader = (props: LoaderFunctionArgs) => {
  return loadUser(props);
};
