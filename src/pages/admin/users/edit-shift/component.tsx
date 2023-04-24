import { Modal } from "@shopify/polaris";
import { useCallback, useState } from "react";

import {
  createSearchParams,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useSearchQuery } from "~/hooks/use-search-query";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";
import { isShiftGroup } from "~/types/shift";
import { EditShiftForm } from "./_form";
import { EditShiftGroupForm } from "./_form-group";
import { loader } from "./loader";

export function Component() {
  const { show } = useToast();
  const navigate = useNavigate();
  const { query } = useSearchQuery();

  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const [open, setOpen] = useState<boolean>(true);

  const { t } = useTranslation({
    id: "edit-shift",
    locales,
  });

  const onClose = useCallback(() => {
    setOpen((prev) => !prev);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { selectedShiftId, selectedGroupId, ...newQuery } = query;
    const timer = setTimeout(() => {
      navigate({
        pathname: `./..`,
        search: createSearchParams(newQuery).toString(),
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
      {isShiftGroup(loaderData) ? (
        <EditShiftGroupForm
          loaderData={loaderData}
          onClose={onClose}
          onDelete={onDelete}
        />
      ) : (
        <EditShiftForm
          loaderData={loaderData}
          onClose={onClose}
          onDelete={onDelete}
        />
      )}
    </Modal>
  );
}

const locales = {
  da: {
    title: "Redigere vagtplan",
  },
  en: {
    title: "Edit shift",
  },
};
