import { Field } from "@shopify/react-form";
import { useMemo } from "react";
import { ShiftTag } from "~/api/model";
import { useTag } from "~/hooks/use-tag";
import { useTranslation } from "~/providers/translate-provider";
import {
  InputDropdown,
  InputDropdownInput,
  InputDropdownProps,
} from "../input-dropdown";

const locales = {
  da: {
    label: "Tag",
    placeholder: "Vælge tag",
  },
  en: {
    label: "Tag",
    placeholder: "Choose tag",
  },
};

export type InputTagsField = ShiftTag | undefined;
export type InputTagsProps = Pick<InputDropdownProps<ShiftTag>, "options"> & {
  field: Field<InputTagsField>;
  input?: InputDropdownInput;
};

export const InputTags = ({ field, input }: InputTagsProps) => {
  const { options } = useTag();
  const { t } = useTranslation({ id: "input-tags", locales });

  const selected = useMemo(
    () => options.find((option) => option.value === field.value),
    [field.value, options]
  );

  return (
    <InputDropdown
      input={{ label: t("label"), placeholder: t("placeholder"), ...input }}
      options={options}
      selected={selected}
      error={field.error}
      onChange={field.onChange}
    />
  );
};
