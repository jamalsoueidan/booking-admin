import { Modal, Tabs } from "@shopify/polaris";
import { TabDescriptor } from "@shopify/polaris/build/ts/latest/src/components/LegacyTabs/types";
import { useCallback, useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import { useShiftModal } from "~/hooks/use-shift-modal";
import { useTranslation } from "~/providers/translate-provider";

export default () => {
  const { isOpen, close, redirect } = useShiftModal();

  const { t } = useTranslation({
    id: "create",
    locales,
  });

  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex: number) => {
      setSelected(selectedTabIndex);
      if (selectedTabIndex === 0) {
        redirect("./create-shift");
      } else {
        redirect("./create-shift-group");
      }
    },
    [redirect]
  );

  const tabs: TabDescriptor[] = [
    {
      content: t("create_day"),
      id: "create-day",
    },
    {
      content: t("create_range"),
      id: "create-group",
    },
  ];

  useEffect(() => {
    handleTabChange(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal open={isOpen} onClose={close} title={t("title")}>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Outlet context={{ close }} />
      </Tabs>
    </Modal>
  );
};

const locales = {
  da: {
    close: "Luk",
    create_day: "Opret arbejdsdag",
    create_range: "Opret arbejdsperiode",
    title: "Tilføj arbejdsdage til skema",
  },
  en: {
    close: "Close",
    create_day: "Create shift",
    create_range: "Create shift (range)",
    title: "Add shifts to schedule",
  },
};
