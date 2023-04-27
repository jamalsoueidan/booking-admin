import { ModalProps as MP } from "@shopify/polaris";
import { createContext } from "react";

export type ModalProps = MP & {
  content: string;
};
export type ModalContextProps = ModalProps & {
  update: (modal: Partial<ModalProps>) => void;
};

export const ModalContext = createContext<ModalContextProps>({} as never);
