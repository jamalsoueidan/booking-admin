import { Modal, Text } from "@shopify/polaris";
import { useCallback, useState } from "react";
import {
  createSearchParams,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { useDate } from "~/hooks/use-date";
import { useSearchQuery } from "~/hooks/use-search-query";
import { useTranslation } from "~/providers/translate-provider";
import { loader } from "./loader";

export default () => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { query } = useSearchQuery();
  const { formatInTimezone } = useDate();
  const [open, setOpen] = useState<boolean>(true);
  const { t } = useTranslation({
    id: "delete-shift",
    locales,
  });

  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  console.log("component loader");
  const onDestroy = useCallback(async () => {
    submit(
      {
        //shiftType: getShiftType(loaderData),
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

  const onCancel = useCallback(() => {
    setOpen((prev) => !prev);
    navigate({
      pathname: `./../edit-shift`,
      search: createSearchParams(query).toString(),
    });
  }, [navigate, query]);

  return (
    <Modal
      open={open}
      onClose={onClose}
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
        </Text>
        <Text as="p">
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
  },
  en: {
    date: "Shiftday {day} og date {date}",
    time: "Time from {from} til {to}",
    action: "Delete shiftday",
    title: "Are you sure?",
    cancel: "Cancel",
  },
};
