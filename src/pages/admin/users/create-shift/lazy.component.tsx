import { Modal, Tabs } from "@shopify/polaris";
import { useCallback, useState } from "react";

import {
  createSearchParams,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { useSearchQuery } from "~/hooks/use-search-query";
import { useTranslation } from "~/providers/translate-provider";
import { CreateShiftForm } from "./_form";
import { CreateShiftGroupForm } from "./_form-group";
import { action } from "./action";

export default () => {
  const navigate = useNavigate();
  const { query } = useSearchQuery();
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;
  const [open, setOpen] = useState<boolean>(true);

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
      content: t("create_day"),
      id: "create-day",
    },
    {
      content: t("create_range"),
      id: "create-group",
    },
  ];

  const onClose = useCallback(() => {
    setOpen((prev) => !prev);
    const timer = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { selectedDate, ...newQuery } = query;
      navigate({
        pathname: `./..`,
        search: createSearchParams(newQuery).toString(),
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [navigate, query]);

  return (
    <Modal open={open} onClose={onClose} title={t("title")}>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        {tabs[selected].id === "create-group" ? (
          <CreateShiftGroupForm onClose={onClose} actionData={actionData} />
        ) : (
          <CreateShiftForm onClose={onClose} actionData={actionData} />
        )}
      </Tabs>
    </Modal>
  );
};

const locales = {
  da: {
    close: "Luk",
    create_day: "Opret en vagtplan",
    create_range: "Opret en valgtplan (period)",
    title: "Tilføj vagt(er) til skema",
  },
  en: {
    close: "Close",
    create_day: "Create shift",
    create_range: "Create shift (range)",
    title: "Add shifts to schedule",
  },
};
