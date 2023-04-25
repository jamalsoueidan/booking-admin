import {
  Button,
  HorizontalGrid,
  HorizontalStack,
  Modal,
} from "@shopify/polaris";

import { useEffect } from "react";
import {
  useActionData,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import { ButtonNavigation } from "~/components/authentication/button-navigation";
import { ShiftForm } from "~/components/shift-form";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";
import { action } from "./action";
import { loader } from "./loader";

type ComponentProps = {
  destroy: () => void;
  close: () => void;
};

export default () => {
  const { show } = useToast();
  const { close, destroy } = useOutletContext<ComponentProps>();
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const { t } = useTranslation({
    id: "edit-shift-form",
    locales,
  });

  useEffect(() => {
    if (actionData) {
      close();
      show({ content: t("success") });
    }
  }, [actionData, close, show, t]);

  return (
    <ShiftForm data={loaderData} method="put">
      <Modal.Section>
        <HorizontalGrid columns={["oneThird", "twoThirds"]}>
          <HorizontalStack gap={"1"} align="start" blockAlign="start">
            <Button onClick={destroy} destructive>
              {t("delete")}
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
    delete: "Slet",
    save_changes: "Gem ændringer",
    success: "Vagtplan redigeret",
  },
  en: {
    delete: "Delete",
    save_changes: "Save changes",
    success: "Shift edit",
  },
};
