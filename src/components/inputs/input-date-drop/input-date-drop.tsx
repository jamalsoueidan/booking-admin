import {
  Icon,
  Popover,
  Range,
  TextField,
  TextFieldProps,
} from "@shopify/polaris";
import { CalendarMajor } from "@shopify/polaris-icons";
import { Field } from "@shopify/react-form";
import { useCallback, useState } from "react";
import { AvailabilityShift } from "~/api/model";
import { useDate } from "~/hooks/use-date";
import { useTranslation } from "~/providers/translate-provider";
import { InputDate, InputDateField } from "../input-date/input-date";

export type InputDateDropField = InputDateField;
export type InputDataDropData = Array<AvailabilityShift>;
export type InputDataDropInput = Partial<
  Omit<TextFieldProps, "error" | "onBlur" | "onChange" | "value">
>;

export interface InputDateDropProps {
  field: Pick<Field<InputDateDropField>, "value" | "onChange" | "error">;
  input?: InputDataDropInput;
  data?: InputDataDropData;
  onMonthChange?: (value: Range) => void;
  disableDates?: boolean;
}

export const InputDateDrop = ({
  field,
  data,
  input,
  onMonthChange,
  disableDates,
}: InputDateDropProps) => {
  const { t } = useTranslation({ id: "input-date-drop", locales });
  const [popoverActive, setPopoverActive] = useState(false);
  const { format } = useDate();

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const handleOnChange = useCallback(
    (value: Date) => {
      field.onChange(value);
      togglePopoverActive();
    },
    [field, togglePopoverActive]
  );

  const activator = (
    <TextField
      label={input?.label || t("label")}
      helpText={input?.helpText}
      error={!input?.disabled && field.error}
      labelHidden={input?.labelHidden}
      autoComplete="off"
      value={field.value ? format(field.value, "PP") : ""}
      readOnly
      onChange={() => {}}
      prefix={<Icon source={CalendarMajor} />}
      onFocus={togglePopoverActive}
      {...input}
    />
  );

  return (
    <Popover
      sectioned
      preferredAlignment="left"
      preferredPosition="below"
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
    >
      <InputDate
        field={{ ...field, onChange: handleOnChange }}
        input={{ onMonthChange }}
        data={data}
        disableDates={disableDates}
      />
    </Popover>
  );
};

const locales = {
  da: {
    label: "Vælg dato",
  },
  en: {
    label: "Pick a date",
  },
};
