import { useContext } from "react";
import { ModalContext, ModalContextType } from "./modal-context";

export const useModal = () => {
  const context = useContext<ModalContextType>(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
