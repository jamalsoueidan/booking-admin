import { Modal } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { useSearchQuery } from "~/hooks/use-search-query";
import { useTranslation } from "~/providers/translate-provider";
import { loader } from "../edit-shift";

export function Component() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { query } = useSearchQuery();
  const [open, setOpen] = useState<boolean>(true);
  const { t } = useTranslation({
    id: "delete-shift",
    locales,
  });

  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  console.log(loaderData);
  const isShiftGroup = isGetShiftGroup(loaderData) ? true : false;

  console.log("component loader");
  const onDestroy = useCallback(async () => {
    submit(
      {
        shiftType: getShiftType(loaderData),
        userId: loaderData.userId,
        groupId: loaderData.groupId || "",
      },
      {
        method: "delete",
      }
    );
    /*onClose();
      show({ content: t("destroy") });*/
  }, [loaderData, submit]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t("title")}
      primaryAction={{
        content: isShiftGroup ? t("action_shifts") : t("action_shift"),
        destructive: true,
        onAction: onDestroy,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onCancel,
        },
      ]}
    >
      <Modal.Section>
        Det vil slette din vagtplan eller vagtplaner
      </Modal.Section>
    </Modal>
  );
}

const locales = {
  da: {
    action_shift: "Slet vagtplan",
    action_shifts: "Slet vagtplaner",
    destroy_shift: "Vagtplan slettet",
    destroy_shifts: "Vagtplan(er) slettet",
    title: "Er du sikker?",
  },
  en: {
    action_shift: "Delete shift",
    action_shifts: "Delete shifts",
    destroy_shift: "Shift deleted",
    destroy_shifts: "Shifts deleted",
    title: "Are you sure?",
  },
};
