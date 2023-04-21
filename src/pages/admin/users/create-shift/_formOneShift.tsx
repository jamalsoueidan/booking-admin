import {
  Box,
  Button,
  Divider,
  HorizontalGrid,
  HorizontalStack,
  Layout,
  TextField,
} from "@shopify/polaris";
import { Field, useField } from "@shopify/react-form";
import { useCallback } from "react";
import { Form } from "react-router-dom";
import { ShiftCreateBody, ShiftTag, ShiftUpdateBody } from "~/api/model";
import { InputTags } from "~/components/inputs/input-tags";
import { useRouterSubmit } from "~/hooks/react-forms";
import { useConvertToUtc } from "~/hooks/use-convert-to-utc";
import { useDate } from "~/hooks/use-date";
import { useTag } from "~/hooks/use-tag";
import { useTranslation } from "~/providers/translate-provider";

export interface FormOneShiftProps {
  data: ShiftCreateBody | ShiftUpdateBody;
  onClose: () => void;
  allowEditing?: {
    tag: boolean;
  };
}

export const FormOneShift = ({
  data,
  onClose,
  allowEditing,
}: FormOneShiftProps) => {
  const { t } = useTranslation({ id: "form-one-shift", locales });
  const { options } = useTag();
  const { formatInTimezone } = useDate();
  const convertToUtc = useConvertToUtc();

  const { fields, onSubmit } = useRouterSubmit({
    fields: {
      start: useField({
        value: data.start,
        validates: [],
      }),
      end: useField({
        value: data.end,
        validates: [],
      }),
      tag: useField<ShiftTag>(options[0].value),
    },
  });

  const onChange = useCallback(
    (
      value: string,
      id: Extract<ShiftCreateBody | ShiftUpdateBody, "start" | "end">
    ) => {
      const field = fields[id] as Field<any>;
      field.onChange(convertToUtc(data[id], value));
      console.log(field.value);
    },
    [convertToUtc, fields, data]
  );

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
