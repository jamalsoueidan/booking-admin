import { ModalProps as MP } from "@shopify/polaris";
import { createContext } from "react";

export type ModalProps = MP & {
  content: string;
};
export type ModalContextAction = ModalProps & {
  update: (modal: Partial<ModalProps>) => void;
};

export const ModalContext = createContext<ModalContextAction>({} as never);
