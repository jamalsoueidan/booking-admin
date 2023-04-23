import {
  Button,
  HorizontalGrid,
  HorizontalStack,
  Modal,
} from "@shopify/polaris";
import { useCallback, useState } from "react";

import {
  createSearchParams,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { ButtonNavigation } from "~/components/authentication/button-navigation";
import { ShiftForm, getShiftType } from "~/components/shift-form";
import { useSearchQuery } from "~/hooks/use-search-query";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";
import { action } from "./action";
import { loader } from "./loader";

export function Component() {
  const { show } = useToast();
  const navigate = useNavigate();
  const { query } = useSearchQuery();

  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;
  const [open, setOpen] = useState<boolean>(true);

  const { t } = useTranslation({
    id: "edit-shift",
    locales,
  });

  const onClose = useCallback(() => {
    setOpen((prev) => !prev);
    const timer = setTimeout(() => {
      navigate({
        pathname: `./..`,
        search: createSearchParams(query).toString(),
      });
    }, 250);
    return () => clearTimeout(timer);
  }, [navigate, query]);

  const onDelete = useCallback(() => {
    setOpen((prev) => !prev);
    navigate({
      pathname: `./../delete-shift`,
      search: createSearchParams(query).toString(),
    });
  }, [navigate, query]);

  return (
    <Modal open={open} onClose={onClose} title={t("title")}>
      <ShiftForm data={loaderData} type={getShiftType(loaderData)} method="put">
        <Modal.Section>
          <HorizontalGrid columns={2}>
            <HorizontalStack gap={"1"}>
              <Button onClick={onDelete} destructive>
                {t("delete")}
              </Button>
            </HorizontalStack>

            <HorizontalStack gap={"1"} align="end">
              <Button onClick={onClose}>{t("close")}</Button>
              <ButtonNavigation>{t("save_changes")}</ButtonNavigation>
            </HorizontalStack>
          </HorizontalGrid>
        </Modal.Section>
      </ShiftForm>
    </Modal>
  );
}

const locales = {
  da: {
    close: "Luk",
    delete: "Slet",
    save_changes: "Gem ændringer",
    success: "Vagtplan redigeret",
    title: "Redigere vagtplan",
  },
  en: {
    close: "Close",
    delete: "Delete",
    save_changes: "Save changes",
    success: "Shift edit",
    title: "Edit shift",
  },
};
