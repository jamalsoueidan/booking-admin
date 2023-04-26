import { Modal } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { ModalContext, ModalProps } from "./modal-context";

export type ModalProviderProps = {
  children: JSX.Element;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const onClose = useCallback(() => {
    updateModal((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  const [modal, updateModal] = useState<ModalProps>({
    open: false,
    title: "title",
    content: "content",
    onClose,
  });

  const update = useCallback(
    (props: Partial<ModalProps>) => {
      updateModal((prev) => {
        return {
          ...prev,
          ...props,
        };
      });
    },
    [updateModal]
  );
  return (
    <ModalContext.Provider value={{ ...modal, update }}>
      <Modal {...modal}>{modal.content}</Modal>
      {children}
    </ModalContext.Provider>
  );
};
