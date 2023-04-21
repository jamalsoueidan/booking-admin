import { Modal, Tabs } from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Shift, ShiftTag } from "~/api/model";

import { setHours } from "date-fns";
import {
  createSearchParams,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useSearchQuery } from "~/hooks/use-search-query";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";
import { FormOneShift } from "./_formOneShift";
import { action } from "./action";
import { loader } from "./loader";

function isShift(shift: Awaited<ReturnType<typeof action>>): shift is Shift {
  if (shift === undefined) {
    return false;
  }
  return (shift as Shift)._id !== undefined;
}

export function Component() {
  const { show } = useToast();
  const navigate = useNavigate();
  const { query } = useSearchQuery();
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
    navigate({
      pathname: "../",
      search: createSearchParams(query).toString(),
    });
  }, [navigate, query]);

  useEffect(() => {
    if (isShift(actionData)) {
      console.log("added");
    }
  }, [actionData]);

  return (
    <Modal open onClose={onClose} title={t("title")}>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />
      <FormOneShift data={data} onClose={onClose} />
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
