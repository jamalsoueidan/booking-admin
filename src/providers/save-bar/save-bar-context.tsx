import { ContextualSaveBarProps } from "@shopify/polaris";
import { createContext } from "react";

export interface SaveBarContextProps {
  updateSaveAction: (value: ContextualSaveBarProps["saveAction"]) => void;
  hide: () => void;
  show: () => void;
  reset: (value: ContextualSaveBarProps) => void;
}

export const SaveBarContext = createContext<SaveBarContextProps>({} as never);
