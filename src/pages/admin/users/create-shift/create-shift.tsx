import { Modal, Tabs } from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShiftTag } from "~/api/model";

import { setHours } from "date-fns";
import { useActionData, useLoaderData } from "react-router-dom";
import { useParams } from "~/providers/params-provider";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";
import { FormOneShift } from "./_formOneShift";
import { action } from "./action";
import { loader } from "./loader";

export function Component() {
  const { show } = useToast();
  const { navigate } = useParams(["selectedDate"]);
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;

  const { t } = useTranslation({
    id: "create-shift",
    locales,
  });

  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      content: t("create_range"),
      id: "create-all",
    },
    {
      content: t("create_day"),
      id: "create-day",
    },
  ];

  const data = useMemo(() => {
    return {
      start: setHours(new Date(loaderData.selectedDate), 10),
      end: setHours(new Date(loaderData.selectedDate), 16),
      tag: ShiftTag.all_day,
    };
  }, [loaderData]);

  const onClose = useCallback(() => {
    navigate({ pathname: "../", search: { selectedDate: null } });
  }, []);

  useEffect(() => {
    if (actionData?.data) {
      show({
        content: t("success"),
      });
      onClose();
    }
  }, [JSON.stringify(actionData), onClose]);

  return (
    <Modal open onClose={onClose} title={t("title")}>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />

      {tabs[selected].id === "create-day" ? (
        <FormOneShift data={data} onClose={onClose} />
      ) : (
        <FormOneShift data={data} onClose={onClose} />
      )}
    </Modal>
  );
}

const locales = {
  da: {
    close: "Luk",
    create_day: "Opret en vagtplan",
    create_range: "Opret flere vagtplan",
    title: "Tilføj vagt til skema",
    success: "Vagtplan(er) oprettet",
  },
  en: {
    close: "Close",
    create_day: "Create for day",
    create_range: "Create for range",
    title: "New availability",
    success: "Shift(s) created",
  },
};
