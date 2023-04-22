import { Modal, Tabs } from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Shift, ShiftTag } from "~/api/model";

import { setHours } from "date-fns";
import {
  createSearchParams,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { useSearchQuery } from "~/hooks/use-search-query";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";
import { FormShift, FormShiftProps } from "./_form";
import { action } from "./action";

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
      days: [],
      start: setHours(new Date(query.selectedDate), 10),
      end: setHours(new Date(query.selectedDate), 16),
      tag: ShiftTag.all_day,
    };
  }, [query]);

  const close = useCallback(() => {
    setOpen((prev) => !prev);
    const timer = setTimeout(() => {
      navigate(
        {
          pathname: `./..`,
          search: createSearchParams(query).toString(),
        },
        { relative: "route" }
      );
    }, 250);
    return () => clearTimeout(timer);
  }, [navigate, query]);

  useEffect(() => {
    if (isShift(actionData)) {
      close();
      show({ content: t("success") });
    }
  }, [actionData, close, show, t]);

  const type: FormShiftProps["type"] =
    tabs[selected].id === "create-all" ? "group" : undefined;

  return (
    <Modal open={open} onClose={close} title={t("title")}>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />
      <FormShift data={data} onClose={close} type={type} method="post" />
    </Modal>
  );
}

const locales = {
  da: {
    create_day: "Opret en vagtplan",
    create_range: "Opret flere vagtplan",
    title: "Tilføj vagt(er) til skema",
    success: "Vagtplan(er) oprettet",
  },
  en: {
    create_day: "Create for day",
    create_range: "Create for range",
    title: "New availability",
    success: "Shift(s) created",
  },
};
