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

import { Field } from "@shopify/react-form";
import { useCallback } from "react";
import { Form } from "react-router-dom";
import {
  ShiftCreateBody,
  ShiftCreateGroupBody,
  ShiftDay,
  ShiftTag,
  ShiftUpdateBody,
  ShiftUpdateGroupBody,
} from "~/api/model";
import { ButtonNavigation } from "~/components/authentication/button-navigation";
import { InputDateField } from "~/components/inputs/input-date";
import { InputDateDrop } from "~/components/inputs/input-date-drop";
import { InputDays } from "~/components/inputs/input-days";
import { InputTags } from "~/components/inputs/input-tags";
import { Validators } from "~/helpers/validators";
import { useRouterSubmit } from "~/hooks/react-forms";
import { useConvertToUtc } from "~/hooks/use-convert-to-utc";
import { useDate } from "~/hooks/use-date";
import { useTag } from "~/hooks/use-tag";
import { useTranslation } from "~/providers/translate-provider";

function isGroup(
  value: FormShiftProps["data"]
): value is ShiftCreateGroupBody | ShiftUpdateGroupBody {
  const days = (value as ShiftCreateGroupBody | ShiftUpdateGroupBody).days;
  return Array.isArray(days);
}

export interface FormShiftProps {
  data:
    | ShiftCreateBody
    | ShiftUpdateBody
    | ShiftCreateGroupBody
    | ShiftUpdateGroupBody;
  method: "put" | "post";
  type: "group" | undefined;
  onClose: () => void;
}

export const FormShift = ({ data, method, type, onClose }: FormShiftProps) => {
  const { formatInTimezone } = useDate();
  const { options } = useTag();
  const { t } = useTranslation({ id: "form-shifts", locales });
  const { dateTimeToUtc, dateToUtc } = useConvertToUtc();

  const days = useField<ShiftDay>({
    validates: [Validators.isSelectedDays(t("select_days.error_empty"))],
    value: isGroup(data) ? data?.days : [],
  });

  const { fields, onSubmit } = useRouterSubmit({
    fields: {
      ...(type === "group" && {
        days,
      }),
      start: useField({
        value: data.start,
        validates: [],
      }),
      end: useField({
        value: data.end,
        validates: [],
      }),
      tag: useField<ShiftTag>(data.tag || options[0].value),
    },
  });

  const onChange = useCallback(
    (value: string, id: "start" | "end") => {
      const field = fields[id] as Field<Date>;
      field.onChange(dateTimeToUtc(field.value, value));
    },
    [fields, dateTimeToUtc]
  );

  const onChangeDate = useCallback(
    (id: "start" | "end") => (value: InputDateField) => {
      const field = fields[id] as Field<Date>;
      field.onChange(dateToUtc(value || new Date()));
    },
    [dateToUtc, fields]
  );

  return (
    <Form method={method} onSubmit={onSubmit}>
      <Box padding={"4"}>
        <Layout>
          {type === "group" ? (
            <>
              <Layout.Section>
                <InputDays field={days} />
              </Layout.Section>
              <Layout.Section>
                <HorizontalGrid columns={2} gap="2">
                  <InputDateDrop
                    input={{ label: t("date_from.label") }}
                    field={{
                      value: fields.start.value,
                      onChange: onChangeDate("start"),
                      error: fields.start.error,
                    }}
                  />
                  <InputDateDrop
                    input={{ label: t("date_to.label") }}
                    field={{
                      value: fields.end.value,
                      onChange: onChangeDate("end"),
                      error: fields.end.error,
                    }}
                  />
                </HorizontalGrid>
              </Layout.Section>
            </>
          ) : null}
          <Layout.Section>
            <HorizontalGrid columns={2} gap="2">
              <TextField
                label={t("time_from.label")}
                type="time"
                id="start"
                name="start"
                autoComplete="off"
                value={formatInTimezone(fields.start.value, "HH:mm")}
                onChange={onChange}
                error={fields.start.error}
              />
              <TextField
                label={t("time_to.label")}
                type="time"
                id="end"
                name="end"
                autoComplete="off"
                value={formatInTimezone(fields.end.value, "HH:mm")}
                onChange={onChange}
                error={fields.end.error}
              />
            </HorizontalGrid>
          </Layout.Section>
          {method === "post" ? (
            <Layout.Section>
              <InputTags field={fields.tag} />
            </Layout.Section>
          ) : null}
        </Layout>
      </Box>
      <Divider />
      <HorizontalStack align="end">
        <Box padding={"4"}>
          <HorizontalStack gap={"1"}>
            <Button onClick={onClose}>{t("close")}</Button>
            <ButtonNavigation>
              {type === "group" ? t("create_range") : t("create_day")}
            </ButtonNavigation>
          </HorizontalStack>
        </Box>
      </HorizontalStack>
    </Form>
  );
};

const locales = {
  da: {
    close: "Luk",
    date_from: { label: "Dato fra" },
    date_to: { label: "Dato til" },
    select_days: { error_empty: "Du skal mindst vælge en dag" },
    time_from: { label: "Tid fra" },
    time_to: { label: "Tid til" },
    create_day: "Opret en vagtplan",
    create_range: "Opret flere vagtplan",
  },
  en: {
    close: "Close",
    date_from: { label: "Date from" },
    date_to: { label: "Date to" },
    select_days: { error_empty: "You must select atleast one day" },
    time_from: { label: "Time from" },
    time_to: { label: "Time to" },
    create_day: "Create for day",
    create_range: "Create for range",
  },
};
