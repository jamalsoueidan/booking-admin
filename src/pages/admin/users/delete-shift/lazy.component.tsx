import { Modal, Text } from "@shopify/polaris";
import { useCallback } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import { useDate } from "~/hooks/use-date";
import { useShiftModal } from "~/hooks/use-shift-modal";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";
import { loader } from "./loader";

export default () => {
  const { show } = useToast();
  const submit = useSubmit();
  const { formatInTimezone } = useDate();
  const { t } = useTranslation({
    id: "delete-shift",
    locales,
  });

  const { isOpen, close, redirect } = useShiftModal();
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const onCancel = useCallback(() => {
    redirect(`./../edit-shift`);
  }, [redirect]);

  const onDestroy = useCallback(async () => {
    submit(
      {
        userId: loaderData.userId,
      },
      {
        method: "delete",
      }
    );
    close();
    show({ content: t("success") });
  }, [loaderData.userId, close, show, submit, t]);

  return (
    <Modal
      open={isOpen}
      onClose={close}
      title={t("title")}
      primaryAction={{
        content: t("action"),
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
        <Text as="p">
          {t("date", {
            date: <strong>{formatInTimezone(loaderData?.start, "PPP")}</strong>,
            day: <strong>{formatInTimezone(loaderData?.start, "EEEE")}</strong>,
          })}
          {", "}
          {t("time", {
            from: <strong>{formatInTimezone(loaderData?.start, "p")}</strong>,
            to: <strong>{formatInTimezone(loaderData?.end, "p")}</strong>,
          })}
        </Text>
      </Modal.Section>
    </Modal>
  );
};

const locales = {
  da: {
    date: "Du er i gang med at slette arbejdsdagen {day} d. {date}",
    time: "fra kl. {from} til {to}",
    action: "Slet arbejdsdag",
    title: "Er du sikker?",
    cancel: "Annullere",
    success: "Vagtplan slettet",
  },
  en: {
    date: "Shiftday {day} og date {date}",
    time: "Time from {from} til {to}",
    action: "Delete shiftday",
    title: "Are you sure?",
    cancel: "Cancel",
    success: "Shift deleted",
  },
};
