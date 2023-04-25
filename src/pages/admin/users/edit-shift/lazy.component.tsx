import { Modal } from "@shopify/polaris";
import { useCallback } from "react";

import { useLoaderData } from "react-router-dom";
import { useShiftModal } from "~/hooks/use-shift-modal";
import { useTranslation } from "~/providers/translate-provider";
import { isShiftGroup } from "~/types/shift";
import { EditShiftForm } from "./_form";
import { EditShiftGroupForm } from "./_form-group";
import { loader } from "./loader";

export default () => {
  const { isOpen, close, redirect } = useShiftModal();
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const { t } = useTranslation({
    id: "edit-shift",
    locales,
  });

  const onDelete = useCallback(() => {
    redirect(`./../delete-shift`);
  }, [redirect]);

  const onDeleteGroup = useCallback(() => {
    redirect(`./../delete-shift-group`);
  }, [redirect]);

  return (
    <Modal open={isOpen} onClose={close} title={t("title")}>
      {isShiftGroup(loaderData) ? (
        <EditShiftGroupForm
          loaderData={loaderData}
          onClose={close}
          onDelete={onDelete}
          onDeleteGroup={onDeleteGroup}
        />
      ) : (
        <EditShiftForm
          loaderData={loaderData}
          onClose={close}
          onDelete={onDelete}
        />
      )}
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
