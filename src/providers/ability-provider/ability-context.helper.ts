import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { AuthSession } from "~/api/model";
import { AbilityContextType, AbilityUser } from "./ability-context";

export const defineAbilityFor = (user: AbilityUser): AbilityContextType => {
  const { can, build } = new AbilityBuilder<AbilityContextType>(
    createMongoAbility
  );

  if (user.isOwner) {
    can("manage", "product");
    can("manage", "user");
    can("manage", "collection");
  }

  if (user.isAdmin) {
    can("manage", "user");
    can("update", "product");
  }

  if (user.isUser) {
    can("update", "user", { _id: user.userId });
  }

  return build();
};

export const getToken = (): AuthSession => {
  return parseJwt(localStorage.getItem("token") || "");
};

export const getAbilityFromToken = () => {
  return defineAbilityFor(getToken());
};

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      // eslint-disable-next-line func-names
      .map(function (c) {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
