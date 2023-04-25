import {
  Button,
  HorizontalGrid,
  HorizontalStack,
  Modal,
} from "@shopify/polaris";

import { useCallback, useEffect } from "react";
import {
  useActionData,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import { ButtonNavigation } from "~/components/authentication/button-navigation";
import { ShiftForm } from "~/components/shift-form";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";
import { isActionSuccess } from "../create-shift";
import { action } from "./action";
import { loader } from "./loader";

type ComponentProps = {
  destroy: () => void;
  close: () => void;
  redirect: (pathname: string) => void;
};

export default () => {
  const { show } = useToast();
  const { close, destroy, redirect } = useOutletContext<ComponentProps>();
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;

  const { t } = useTranslation({
    id: "edit-shift-group-form",
    locales,
  });

  const onDeleteGroup = useCallback(() => {
    redirect(`./../delete-shift-group`);
  }, [redirect]);

  useEffect(() => {
    if (isActionSuccess(actionData)) {
      close();
      show({ content: t("success") });
    }
  }, [actionData, close, show, t]);

  return (
    <ShiftForm data={loaderData} type="group" method="put">
      <Modal.Section>
        <HorizontalGrid columns={2}>
          <HorizontalStack gap={"1"} align="start" blockAlign="start">
            <Button onClick={destroy} destructive>
              {t("delete")}
            </Button>
            <Button onClick={onDeleteGroup} destructive>
              {t("delete_range")}
            </Button>
          </HorizontalStack>

          <HorizontalStack gap={"1"} align="end" blockAlign="start">
            <ButtonNavigation>{t("save_changes")}</ButtonNavigation>
          </HorizontalStack>
        </HorizontalGrid>
      </Modal.Section>
    </ShiftForm>
  );
};

const locales = {
  da: {
    delete: "Slet arbejdsdag",
    delete_range: "Slet periode",
    save_changes: "Gem ændringer",
    success: "Vagtplaner redigeret",
    title: "Redigere vagtplaner",
  },
  en: {
    delete: "Delete shiftday",
    delete_range: "Delete range",
    save_changes: "Save changes",
    success: "Shifts edit",
    title: "Edit shifts",
  },
};
