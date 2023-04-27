import { ContextualSaveBarProps } from "@shopify/polaris";
import { createContext } from "react";

export interface SaveBarContextProps {
  update: (value: ContextualSaveBarProps) => void;
  hide: () => void;
  show: () => void;
  reset: () => void;
}

export const SaveBarContext = createContext<SaveBarContextProps>({} as never);
