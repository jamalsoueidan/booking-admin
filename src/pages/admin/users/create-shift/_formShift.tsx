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
import { useCallback, useEffect } from "react";
import { Form } from "react-router-dom";
import { ShiftCreateBody, ShiftTag, ShiftUpdateBody } from "~/api/model";
import { InputTags } from "~/components/inputs/input-tags";
import { useDate } from "~/hooks/use-date";
import { useRouterForm } from "~/hooks/use-router-form";
import { useTag } from "~/hooks/use-tag";
import { useFieldCallback } from "~/lib/form/use-field-callback";
import { useTranslation } from "~/providers/translate-provider";

export type ScheduleFormOneShiftAllowEditing = {
  tag: boolean;
};

export interface ScheduleFormOneShiftProps {
  data: ShiftCreateBody | ShiftUpdateBody;
  onClose: () => void;
  allowEditing?: ScheduleFormOneShiftAllowEditing;
}

export const FormShift = ({
  data,
  onClose,
  allowEditing,
}: ScheduleFormOneShiftProps) => {
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

  const onChangeEndTime = useCallback(
    (value: string) => {
      fields.end.onChange(convertToUtc(new Date(data.end), value).toJSON());
    },
    [convertToUtc, data]
  );

  const onChangeStartTime = useCallback(
    (value: string) => {
      fields.start.onChange(convertToUtc(new Date(data.start), value).toJSON());
    },
    [convertToUtc, data]
  );

  const { fields, onSubmit } = useRouterForm({
    fields: {
      endTime: useFieldCallback({
        value: formatInTimezone(data.end, "HH:mm"),
        validates: [],
        onChange: onChangeEndTime,
      }),
      startTime: useFieldCallback({
        value: formatInTimezone(data.start, "HH:mm"),
        validates: [],
        onChange: onChangeStartTime,
      }),
      start: useField({ value: "", validates: [] }),
      end: useField({ value: "", validates: [] }),
      tag: useField<ShiftTag>(options[0].value),
    },
  });

  useEffect(() => {
    fields.startTime.onChange(fields.startTime.value);
    fields.endTime.onChange(fields.endTime.value);
  }, []);

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
            <HorizontalGrid columns={2} gap="2">
              <TextField
                label={t("time_from.label")}
                type="time"
                autoComplete="off"
                {...fields.startTime}
              />
              <TextField
                label={t("time_to.label")}
                type="time"
                autoComplete="off"
                {...fields.endTime}
              />

              <input
                name="start"
                hidden
                autoComplete="off"
                value={fields.start.value}
                onChange={() => {}}
              />
              <input
                name="end"
                hidden
                autoComplete="off"
                value={fields.end.value}
                onChange={() => {}}
              />
            </HorizontalGrid>
          </Layout.Section>
          <Layout.Section>
            <InputTags field={fields.tag} name="tag" />
          </Layout.Section>
        </Layout>
      </Box>
      <Divider />
      <HorizontalStack align="end">
        <Box padding={"4"}>
          <HorizontalStack gap={"1"}>
            <Button onClick={onClose}>Luk</Button>
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
