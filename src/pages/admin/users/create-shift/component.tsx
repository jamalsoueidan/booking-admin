import { Box, Button, HorizontalStack, Modal, Tabs } from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShiftTag } from "~/api/model";

import { addWeeks, setHours } from "date-fns";
import {
  createSearchParams,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { ButtonNavigation } from "~/components/authentication/button-navigation";
import { useSearchQuery } from "~/hooks/use-search-query";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";
import { isModifyShiftGroup, isShift } from "~/types/shift";

import { ShiftForm, ShiftFormProps } from "~/components/shift-form";
import { action } from "./action";

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

  const type: ShiftFormProps["type"] =
    tabs[selected].id === "create-all" ? "group" : undefined;

  const start = setHours(new Date(query.selectedDate), 10);
  const end = setHours(new Date(query.selectedDate), 16);

  const data = useMemo(() => {
    return {
      days: [
        start
          .toLocaleString("en-US", {
            weekday: "long",
          })
          .toLowerCase(),
      ],
      start,
      end: type === "group" ? addWeeks(end, 1) : end,
      tag: ShiftTag.all_day,
    };
  }, [end, start, type]);

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
      show({ content: t("success_day") });
    }
    if (isModifyShiftGroup(actionData)) {
      close();
      show({ content: t("success_range") });
    }
  }, [actionData, close, show, t]);

  return (
    <Modal open={open} onClose={close} title={t("title")}>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />
      <ShiftForm data={data} type={type} method="post">
        <HorizontalStack align="end">
          <Box padding={"4"}>
            <HorizontalStack gap={"1"}>
              <Button onClick={close}>{t("close")}</Button>
              <ButtonNavigation>
                {type === "group" ? t("create_range") : t("create_day")}
              </ButtonNavigation>
            </HorizontalStack>
          </Box>
        </HorizontalStack>
      </ShiftForm>
    </Modal>
  );
}

const locales = {
  da: {
    close: "Luk",
    create_day: "Opret en vagtplan",
    create_range: "Opret flere vagtplaner",
    title: "Tilføj vagt(er) til skema",
    success_day: "Vagtplan oprettet",
    success_range: "Vagtplaner oprettet",
  },
  en: {
    close: "Close",
    create_day: "Create for day",
    create_range: "Create for range",
    title: "New availability",
    success_day: "Shift created",
    success_range: "Shifts created",
  },
};
