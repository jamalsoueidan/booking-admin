import { ContextualSaveBarProps } from "@shopify/polaris";
import { useContext } from "react";
import { SaveBarContext } from "./save-bar-context";

export const useSaveBar = (props: ContextualSaveBarProps) => {
  const context = useContext(SaveBarContext);
  if (context === undefined) {
    throw new Error("useSaveBar must be used within a SaveBarProvider");
  }

  context.reset();
  context.update(props);

  return context;
};
