import { Modal, Tabs } from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";
import { ShiftTag } from "~/api/model";

import { setHours } from "date-fns";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useTranslation } from "~/providers/translate-provider";

export function Component() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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
    const selectedDate = searchParams.get("selected-date") || "";
    return {
      start: setHours(new Date(selectedDate), 10),
      end: setHours(new Date(selectedDate), 16),
      tag: ShiftTag.all_day,
    };
  }, []);

  const onClose = useCallback(() => {
    searchParams.delete("selected-date");
    navigate({
      pathname: "../",
      search: createSearchParams(searchParams).toString(),
    });
  }, []);

  return (
    <Modal open onClose={onClose} title={t("title")}>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}></Tabs>
    </Modal>
  );
}

const locales = {
  da: {
    close: "Luk",
    create_day: "Opret en vagtplan",
    create_range: "Opret flere vagtplan",
    title: "Tilføj vagt til skema",
  },
  en: {
    close: "Close",
    create_day: "Create for day",
    create_range: "Create for range",
    title: "New availability",
  },
};
