import { Box, Button, HorizontalStack } from "@shopify/polaris";
import { useEffect, useMemo } from "react";
import { ShiftTag } from "~/api/model";

import { setHours } from "date-fns";
import { ButtonNavigation } from "~/components/authentication/button-navigation";
import { useSearchQuery } from "~/hooks/use-search-query";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";

import { useActionData, useOutletContext } from "react-router-dom";
import { ShiftData, ShiftForm } from "~/components/shift-form";
import { action, isActionSuccess } from "./action";

type ComponentProps = {
  close: () => void;
};

export default () => {
  const { close } = useOutletContext<ComponentProps>();
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;
  const { show } = useToast();
  const { query } = useSearchQuery();

  const { t } = useTranslation({
    id: "create-shift-form",
    locales,
  });

  const start = setHours(new Date(query.selectedDate), 10);
  const end = setHours(new Date(query.selectedDate), 16);

  const data: ShiftData = useMemo(() => {
    return {
      start,
      end: end,
      tag: ShiftTag.all_day,
    };
  }, [end, start]);

  useEffect(() => {
    if (isActionSuccess(actionData)) {
      close();
      show({ content: t("success") });
    }
  }, [actionData, close, show, t]);

  return (
    <ShiftForm data={data} method="post">
      <HorizontalStack align="end">
        <Box padding={"4"}>
          <HorizontalStack gap={"1"}>
            <Button onClick={close}>{t("close")}</Button>
            <ButtonNavigation>{t("create")}</ButtonNavigation>
          </HorizontalStack>
        </Box>
      </HorizontalStack>
    </ShiftForm>
  );
};

const locales = {
  da: {
    close: "Luk",
    create: "Opret arbejdsdag",
    success: "Arbejdsdag oprettet",
  },
  en: {
    close: "Close",
    create: "Create for day",
    success: "Shift created",
  },
};
