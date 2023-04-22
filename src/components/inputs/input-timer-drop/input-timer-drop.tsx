import { Select } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import {
  UseTimerField,
  UseTimerFieldRange,
  UseTimerInput,
  useTimer,
} from "~/hooks/use-timer";
import { useTranslation } from "~/providers/translate-provider";

export type InputTimerDropField = UseTimerField;
export interface InputTimerDropProps {
  field: Field<UseTimerField>;
  data?: UseTimerFieldRange[];
  input?: UseTimerInput;
}

export const InputTimerDrop = ({ data, input, field }: InputTimerDropProps) => {
  const { options, onChange } = useTimer({
    autoSelectFirst: !input?.placeholder,
    data,
    field,
  });

  const { t } = useTranslation({
    id: "input-timer-drop",
    locales,
  });

  return (
    <Select
      label={input?.label || t("label")}
      disabled={!data}
      {...field}
      {...input}
      options={options}
      onChange={onChange}
      value={field.value?.start.toJSON()}
    />
  );
};

const locales = {
  da: {
    label: "Vælg tid",
  },
  en: {
    label: "Choose time",
  },
};
