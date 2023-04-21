import { Modal, Tabs } from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";
import { ShiftTag } from "~/api/model";

import { setHours } from "date-fns";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useParams } from "~/providers/params-provider";
import { useTranslation } from "~/providers/translate-provider";

export function Component() {
  const navigate = useNavigate();
  const { params } = useParams(["selectedDate"]);
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
      start: setHours(new Date(params.selectedDate), 10),
      end: setHours(new Date(params.selectedDate), 16),
      tag: ShiftTag.all_day,
    };
  }, [params.selectedDate]);

  const onClose = useCallback(() => {
    const { selectedDate, ...newParams } = params;
    navigate({
      pathname: "../",
      search: createSearchParams(newParams).toString(),
    });
  }, [params, navigate]);

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
