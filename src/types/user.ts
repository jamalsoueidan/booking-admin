import { User } from "~/api/model";

export const isUser = (user: User | unknown): user is User => {
  if (user) {
    return (user as User)._id !== undefined;
  }
  return false;
};
