import {
  HorizontalGrid,
  Modal,
  TextField,
  VerticalStack,
} from "@shopify/polaris";
import { useField } from "@shopify/react-form";

import { Field } from "@shopify/react-form";
import { useCallback } from "react";
import { Shift, ShiftDay, ShiftTag } from "~/api/model";
import { ShiftGroup } from "~/api/model/shiftGroup";
import { InputDateField } from "~/components/inputs/input-date";
import { InputDateDrop } from "~/components/inputs/input-date-drop";
import { InputDays } from "~/components/inputs/input-days";
import { InputTags } from "~/components/inputs/input-tags";
import { Validators } from "~/helpers/validators";
import { useConvertToUtc } from "~/hooks/use-convert-to-utc";
import { useDate } from "~/hooks/use-date";
import { useTag } from "~/hooks/use-tag";
import { Form, useRouterSubmit } from "~/lib/react-form";
import { useTranslation } from "~/providers/translate-provider";

export function isDataShiftGroup(value?: ShiftData): value is ShiftGroup {
  const days = (value as ShiftGroup).days;
  return Array.isArray(days);
}

export type ShiftData =
  | Pick<Shift, "start" | "end" | "tag">
  | Omit<ShiftGroup, "userId">;
export type ShiftType = "group";

export interface ShiftFormProps {
  data: ShiftData;
  method: "put" | "post";
  type?: ShiftType;
  children: JSX.Element;
}

export const ShiftForm = ({ data, method, type, children }: ShiftFormProps) => {
  const { formatInTimezone } = useDate();
  const { options } = useTag();
  const { t } = useTranslation({ id: "form-shifts", locales });
  const { dateTimeToUtc, dateToUtc } = useConvertToUtc();

  const days = useField<ShiftDay>({
    validates: [Validators.isSelectedDays(t("select_days.error_empty"))],
    value: isDataShiftGroup(data) ? data?.days : [],
  });

  const groupId = useField<string | undefined>(
    isDataShiftGroup(data) ? data?.groupId : undefined
  );

  const { fields, submit, submitErrors } = useRouterSubmit({
    fields: {
      ...(type === "group" && {
        days,
        ...(method === "put" && { groupId }),
      }),
      start: useField({
        value: data.start || new Date(),
        validates: [],
      }),
      end: useField({
        value: data.end || new Date(),
        validates: [],
      }),
      tag: useField<ShiftTag>(data.tag || options[0].value),
    },
    method,
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
    <Form method={method} onSubmit={submit} submitErrors={submitErrors}>
      <Modal.Section>
        {isDataShiftGroup(data)
          ? t("title_range", {
              from: <strong>{formatInTimezone(data?.start, "PPPP")}</strong>,
              to: <strong>{formatInTimezone(data?.end, "PPPP")}</strong>,
            })
          : t("title_day", {
              date: <strong>{formatInTimezone(data?.start, "PPP")}</strong>,
              day: <strong>{formatInTimezone(data?.start, "EEEE")}</strong>,
            })}
      </Modal.Section>
      <Modal.Section>
        <VerticalStack gap="4">
          {type === "group" ? <InputDays field={days} /> : null}
          {type === "group" ? (
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
          ) : null}

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

          {method === "post" ? <InputTags field={fields.tag} /> : null}
        </VerticalStack>
      </Modal.Section>
      {children}
    </Form>
  );
};

const locales = {
  da: {
    title_day: "Arbejdsdag {day} og dato {date}",
    title_range: "Arbejdsperioden fra d. {from} til og med d. {to}",
    date_from: { label: "Dato fra" },
    date_to: { label: "Dato til" },
    select_days: { error_empty: "Du skal mindst vælge en dag" },
    time_from: { label: "Tid fra" },
    time_to: { label: "Tid til" },
  },
  en: {
    title_day: "Shiftday {day} og date {date}",
    title_range: "Shiftperiode from {from} to {to}",
    date_from: { label: "Date from" },
    date_to: { label: "Date to" },
    select_days: { error_empty: "You must select atleast one day" },
    time_from: { label: "Time from" },
    time_to: { label: "Time to" },
  },
};
