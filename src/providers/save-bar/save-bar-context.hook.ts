import { useContext } from "react";
import { SaveBarContext } from "./save-bar-context";

export const useSaveBar = () => {
  const context = useContext(SaveBarContext);
  if (context === undefined) {
    throw new Error("useSaveBar must be used within a SaveBarProvider");
  }

  return context;
};
