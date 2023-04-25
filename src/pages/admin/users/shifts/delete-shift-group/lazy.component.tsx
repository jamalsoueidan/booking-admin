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
  const { isOpen, close, back } = useShiftModal();
  const { t } = useTranslation({
    id: "delete-shift-group",
    locales,
  });

  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const onDestroy = useCallback(async () => {
    submit(
      {
        userId: loaderData.userId,
        start: loaderData.start.toJSON(),
        end: loaderData.end.toJSON(),
      },
      {
        method: "delete",
      }
    );
    close();
    show({ content: t("success") });
  }, [close, loaderData, show, submit, t]);

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
          onAction: back,
        },
      ]}
    >
      <Modal.Section>
        <Text as="p">
          {t("date", {
            from: <strong>{formatInTimezone(loaderData?.start, "PPP")}</strong>,
            to: <strong>{formatInTimezone(loaderData?.end, "PPP")}</strong>,
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
    date: "Du er i gang med at slette arbejdsperioden fra d. {from} til og med d. {to}",
    time: "fra kl. {from} til {to}",
    action: "Slet arbejdsperiode",
    title: "Er du sikker?",
    cancel: "Annullere",
    success: "Arbejdsperiode slettet",
  },
  en: {
    date: "You are deleting shifts from {from} to {to}",
    time: "Time from {from} til {to}",
    action: "Delete shiftdays",
    title: "Are you sure?",
    cancel: "Cancel",
    success: "Shifts deleted",
  },
};
