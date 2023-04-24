import { HorizontalGrid, Modal, TextField } from "@shopify/polaris";
import { useField } from "@shopify/react-form";

import { Field } from "@shopify/react-form";
import { useCallback } from "react";
import { Form } from "react-router-dom";
import { Shift, ShiftDay, ShiftTag } from "~/api/model";
import { ShiftGroup } from "~/api/model/shiftGroup";
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

  const { fields, onSubmit } = useRouterSubmit({
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
    <Form method={method} onSubmit={onSubmit}>
      {type === "group" ? (
        <>
          <Modal.Section>
            <InputDays field={days} />
          </Modal.Section>
          <Modal.Section>
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
          </Modal.Section>
        </>
      ) : null}
      <Modal.Section>
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
      </Modal.Section>
      {method === "post" ? (
        <Modal.Section>
          <InputTags field={fields.tag} />
        </Modal.Section>
      ) : null}
      {children}
    </Form>
  );
};

const locales = {
  da: {
    date_from: { label: "Dato fra" },
    date_to: { label: "Dato til" },
    select_days: { error_empty: "Du skal mindst vælge en dag" },
    time_from: { label: "Tid fra" },
    time_to: { label: "Tid til" },
  },
  en: {
    date_from: { label: "Date from" },
    date_to: { label: "Date to" },
    select_days: { error_empty: "You must select atleast one day" },
    time_from: { label: "Time from" },
    time_to: { label: "Time to" },
  },
};
