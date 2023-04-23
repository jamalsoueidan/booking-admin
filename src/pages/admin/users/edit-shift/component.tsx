import { Box, Button, HorizontalStack, Modal } from "@shopify/polaris";
import { useCallback, useState } from "react";

import {
  createSearchParams,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { ButtonNavigation } from "~/components/authentication/button-navigation";
import { ShiftForm, ShiftFormProps } from "~/components/shift-form";
import { useSearchQuery } from "~/hooks/use-search-query";
import { useTranslation } from "~/providers/translate-provider";
import { isGetShiftGroup } from "~/types/shift";
import { action } from "./action";
import { loader } from "./loader";

export function Component() {
  const navigate = useNavigate();
  const { query } = useSearchQuery();
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;
  const [open, setOpen] = useState<boolean>(true);

  const { t } = useTranslation({
    id: "edit-shift",
    locales,
  });

  const type: ShiftFormProps["type"] = isGetShiftGroup(loaderData)
    ? "group"
    : undefined;

  const close = useCallback(() => {
    setOpen((prev) => !prev);
    const timer = setTimeout(() => {
      navigate(
        {
          pathname: `./..`,
          search: createSearchParams(query).toString(),
        },
        { relative: "route" }
      );
    }, 250);
    return () => clearTimeout(timer);
  }, [navigate, query]);

  return (
    <Modal open={open} onClose={close} title={t("title")}>
      <ShiftForm data={loaderData} type={type} method="put">
        <HorizontalStack align="end">
          <Box padding={"4"}>
            <HorizontalStack gap={"1"}>
              <Button onClick={close}>{t("close")}</Button>
              <Button onClick={close} destructive>
                {t("destroy")}
              </Button>
              <ButtonNavigation>{t("save_changes")}</ButtonNavigation>
            </HorizontalStack>
          </Box>
        </HorizontalStack>
      </ShiftForm>
    </Modal>
  );
}

const locales = {
  da: {
    close: "Luk",
    destroy: "Slet vagtplan(er)",
    save_changes: "Gem ændringer",
    success: "Vagtplan redigeret",
    title: "Redigere vagtplan",
  },
  en: {
    close: "Close",
    destroy: "Delete shift(s)",
    save_changes: "Save changes",
    success: "Shift edit",
    title: "Edit shift",
  },
};
