import { Modal } from "@shopify/polaris";
import { useCallback } from "react";

import { Outlet } from "react-router-dom";
import { useShiftModal } from "~/hooks/use-shift-modal";
import { useTranslation } from "~/providers/translate-provider";

export default () => {
  const { isOpen, close, redirect } = useShiftModal();
  const { t } = useTranslation({
    id: "edit-shift",
    locales,
  });

  const onDelete = useCallback(() => {
    redirect(`./../delete-shift`);
  }, [redirect]);

  return (
    <Modal open={isOpen} onClose={close} title={t("title")}>
      <Outlet context={{ onDelete, close, redirect }} />
    </Modal>
  );
};

const locales = {
  da: {
    title: "Redigere vagtplan",
  },
  en: {
    title: "Edit shift",
  },
};
