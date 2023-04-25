import { Modal, Tabs } from "@shopify/polaris";
import { useCallback, useState } from "react";

import { useActionData } from "react-router-dom";
import { useShiftModal } from "~/hooks/use-shift-modal";
import { useTranslation } from "~/providers/translate-provider";
import { CreateShiftForm } from "./_form";
import { CreateShiftGroupForm } from "./_form-group";
import { action } from "./action";

export default () => {
  const { isOpen, close } = useShiftModal();
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
      content: t("create_day"),
      id: "create-day",
    },
    {
      content: t("create_range"),
      id: "create-group",
    },
  ];

  return (
    <Modal open={isOpen} onClose={close} title={t("title")}>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        {tabs[selected].id === "create-group" ? (
          <CreateShiftGroupForm onClose={close} actionData={actionData} />
        ) : (
          <CreateShiftForm onClose={close} actionData={actionData} />
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
