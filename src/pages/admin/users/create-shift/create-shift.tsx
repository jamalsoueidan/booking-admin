import { Modal, Tabs } from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Shift, ShiftTag } from "~/api/model";

import { setHours } from "date-fns";
import {
  createSearchParams,
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
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
  const params = useParams();
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
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
      start: setHours(new Date(query.selectedDate), 10),
      end: setHours(new Date(query.selectedDate), 16),
      tag: ShiftTag.all_day,
    };
  }, [query]);

  const close = useCallback(() => {
    setOpen((prev) => !prev);
    console.log(params);
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
  }, [navigate, params, query]);

  useEffect(() => {
    if (isShift(actionData)) {
      close();
      show({ content: t("success") });
    }
  }, [actionData, close, show, t]);

  console.log(params);

  return (
    <Modal open={open} onClose={close} title={t("title")}>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />
      <FormOneShift data={data} onClose={close} />
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
