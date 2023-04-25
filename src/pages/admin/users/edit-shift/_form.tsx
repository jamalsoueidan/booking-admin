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
import { action } from "./action";
import { loadShift } from "./loader";

type EditShiftGroupProps = {
  loaderData: Awaited<ReturnType<typeof loadShift>>;
  onDelete: () => void;
  onClose: () => void;
};

export function EditShiftForm({
  loaderData,
  onDelete,
  onClose,
}: EditShiftGroupProps) {
  const { show } = useToast();
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;

  const { t } = useTranslation({
    id: "edit-shift-form",
    locales,
  });

  useEffect(() => {
    if (actionData) {
      onClose();
      show({ content: t("success") });
    }
  }, [actionData, onClose, show, t]);

  return (
    <ShiftForm data={loaderData} method="put">
      <Modal.Section>
        <HorizontalGrid columns={["oneThird", "twoThirds"]}>
          <HorizontalStack gap={"1"} align="start" blockAlign="start">
            <Button onClick={onDelete} destructive>
              {t("delete")}
            </Button>
          </HorizontalStack>

          <HorizontalStack gap={"1"} align="end" blockAlign="start">
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
    delete: "Slet",
    save_changes: "Gem ændringer",
    success: "Vagtplan redigeret",
  },
  en: {
    close: "Close",
    delete: "Delete",
    save_changes: "Save changes",
    success: "Shift edit",
  },
};
