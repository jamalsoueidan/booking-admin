import {
  Button,
  HorizontalGrid,
  HorizontalStack,
  Modal,
} from "@shopify/polaris";

import { useEffect } from "react";
import { useActionData } from "react-router-dom";
import { ButtonNavigation } from "~/components/authentication/button-navigation";
import { ShiftForm } from "~/components/shift-form";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";
import { isActionSuccess } from "../create-shift";
import { action } from "./action";
import { loadShiftGroup } from "./loader";

type EditShiftGroupFormProps = {
  loaderData: Awaited<ReturnType<typeof loadShiftGroup>>;
  onDelete: () => void;
  onClose: () => void;
};

export function EditShiftGroupForm({
  loaderData,
  onDelete,
  onClose,
}: EditShiftGroupFormProps) {
  const { show } = useToast();
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;

  const { t } = useTranslation({
    id: "edit-shift-group-form",
    locales,
  });

  useEffect(() => {
    if (isActionSuccess(actionData)) {
      onClose();
      show({ content: t("success") });
    }
  }, [actionData, onClose, show, t]);

  return (
    <ShiftForm data={loaderData} type="group" method="put">
      <Modal.Section>
        <HorizontalGrid columns={2}>
          <HorizontalStack gap={"1"}>
            <Button onClick={onDelete} destructive>
              {t("delete")}
            </Button>
            <Button onClick={onDelete} destructive>
              {t("delete_range")}
            </Button>
          </HorizontalStack>

          <HorizontalStack gap={"1"} align="end">
            <Button onClick={onClose}>{t("close")}</Button>
            <ButtonNavigation>{t("save_changes")}</ButtonNavigation>
          </HorizontalStack>
        </HorizontalGrid>
      </Modal.Section>
    </ShiftForm>
  );
}

const locales = {
  da: {
    close: "Luk",
    delete: "Slet arbejdsdag",
    delete_range: "Slet periode",
    save_changes: "Gem ændringer",
    success: "Vagtplaner redigeret",
    title: "Redigere vagtplaner",
  },
  en: {
    close: "Close",
    delete: "Delete shiftday",
    delete_range: "Delete range",
    save_changes: "Save changes",
    success: "Shifts edit",
    title: "Edit shifts",
  },
};
