import {
  Box,
  Button,
  Divider,
  HorizontalGrid,
  HorizontalStack,
  Layout,
  TextField,
} from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { useCallback } from "react";
import { Form, useNavigate } from "react-router-dom";
import { ShiftTag } from "~/api/model";
import { InputTags } from "~/components/inputs/input-tags";
import { useDate } from "~/hooks/use-date";
import { useRouterForm } from "~/hooks/use-router-form";
import { useTag } from "~/hooks/use-tag";
import { useTranslation } from "~/providers/translate-provider";

export type ScheduleFormOneShiftAllowEditing = {
  tag: boolean;
};
export interface ScheduleFormOneShiftBody {
  start: Date;
  end: Date;
  tag: ShiftTag;
}

export interface ScheduleFormOneShiftProps {
  data: ScheduleFormOneShiftBody;
  allowEditing?: ScheduleFormOneShiftAllowEditing;
}

export const ScheduleFormOneShift = ({
  data,
  allowEditing,
}: ScheduleFormOneShiftProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation({ id: "schedule-form-one-shift", locales });
  const { options } = useTag();
  const { toUtc, formatInTimezone } = useDate();

  const convertToUtc = useCallback(
    (date: Date, time: string) => {
      const [hour, minuttes] = time.split(":").map((_) => parseInt(_, 10));
      return toUtc(
        new Date(
          `${formatInTimezone(date, "yyyy-MM-dd")} ${hour}:${minuttes}:00`
        )
      );
    },
    [formatInTimezone, toUtc]
  );

  const { fields, onSubmit } = useRouterForm({
    fields: {
      endTime: useField(formatInTimezone(data.end, "HH:mm")),
      startTime: useField(formatInTimezone(data.start, "HH:mm")),
      tag: useField<ShiftTag>(options[0].value),
    },
  });

  return (
    <Form method="post" onSubmit={onSubmit}>
      <Box padding={"4"}>
        <Layout>
          <Layout.Section>
            {t("title", {
              date: <strong>{formatInTimezone(data?.start, "PPP")}</strong>,
              day: <strong>{formatInTimezone(data?.start, "EEEE")}</strong>,
            })}
          </Layout.Section>
          <Layout.Section>
            <HorizontalGrid columns={2}>
              <TextField
                label={t("time_from.label")}
                type="time"
                autoComplete="off"
                {...fields.startTime}
              />
              <input type="hidden" name="start" />
              <input type="hidden" name="end" />
              <TextField
                label={t("time_to.label")}
                type="time"
                autoComplete="off"
                {...fields.endTime}
              />
            </HorizontalGrid>
          </Layout.Section>
          <Layout.Section>
            <InputTags field={fields.tag} />
          </Layout.Section>
        </Layout>
      </Box>
      <Divider />
      <HorizontalStack align="end">
        <Box padding={"4"}>
          <HorizontalStack gap={"1"}>
            <Button onClick={() => navigate("../", { relative: "route" })}>
              Luk
            </Button>
            <Button submit primary>
              Opret
            </Button>
          </HorizontalStack>
        </Box>
      </HorizontalStack>
    </Form>
  );
};

const locales = {
  da: {
    time_from: {
      label: "Tid fra",
    },
    time_to: {
      label: "Tid til",
    },
    title: "Arbejdsdag {day} og dato {date}",
  },
  en: {
    time_from: {
      label: "Time from",
    },
    time_to: {
      label: "Time to",
    },
    title: "Shiftday {day} og date {date}",
  },
};
