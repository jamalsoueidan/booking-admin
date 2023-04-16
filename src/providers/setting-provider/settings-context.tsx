import { createContext } from "react";
import { SettingsContextType } from "./settings-context.types";
import { LinkComponent } from "./stories/helper";

export const defaultValues = {
  LinkComponent,
  language: "da",
  navigate: () => {},
  timeZone: "Europe/Copenhagen",
  update: () => {},
};

export const SettingsContext =
  createContext<SettingsContextType>(defaultValues);
