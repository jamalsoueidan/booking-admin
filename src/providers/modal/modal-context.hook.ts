import { useContext } from "react";
import { ModalContext, ModalContextProps } from "./modal-context";

export const useModal = () => {
  const context = useContext<ModalContextProps>(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
