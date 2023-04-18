import { AbilityTuple, PureAbility } from "@casl/ability";
import { createContextualCan } from "@casl/react";

import { createContext } from "react";
import {
  AuthSession,
  CollectionGetAll,
  ProductGetAll,
  User,
} from "~/api/model";

export type AbilityUser = Pick<
  AuthSession,
  "isAdmin" | "isOwner" | "isUser" | "userId"
>;

export type AbilityActions = "manage" | "create" | "read" | "update" | "delete";
export type AbilitySubjects =
  | "product"
  | "staff"
  | "collection"
  | "shopify"
  | User
  | ProductGetAll
  | CollectionGetAll;

export type AbilityContextType = PureAbility<
  AbilityTuple<AbilityActions, AbilitySubjects>
>;

export const AbilityContext = createContext<AbilityContextType>(
  {} as AbilityContextType
);

export const AbilityCan = createContextualCan(AbilityContext.Consumer);
