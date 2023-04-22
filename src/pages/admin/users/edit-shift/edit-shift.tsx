import { Modal } from "@shopify/polaris";
import { useCallback, useState } from "react";

import {
  createSearchParams,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { useSearchQuery } from "~/hooks/use-search-query";
import { useTranslation } from "~/providers/translate-provider";
import { action } from "./action";

export function Component() {
  const navigate = useNavigate();
  const { query } = useSearchQuery();
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;
  const [open, setOpen] = useState<boolean>(true);

  const { t } = useTranslation({
    id: "edit-shift",
    locales,
  });

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
      testerne
    </Modal>
  );
}

const locales = {
  da: {
    destroy: "Slet vagtplan",
    save_changes: "Gem ændringer",
    success: "Vagtplan redigeret",
    title: "Redigere vagtplan",
  },
  en: {
    destroy: "Delete shift",
    save_changes: "Save changes",
    success: "Shift edit",
    title: "Edit shift",
  },
};
