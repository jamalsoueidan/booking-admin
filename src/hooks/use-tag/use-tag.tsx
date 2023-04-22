import { Icon } from "@shopify/polaris";
import { useCallback, useMemo } from "react";
import { ShiftTag } from "~/api/model";
import { useTranslation } from "~/providers/translate-provider";

const locales = {
  da: {
    [ShiftTag.all_day]: "Alle dage",
    [ShiftTag.end_of_week]: "Slutning af ugen",
    [ShiftTag.weekday]: "Hverdag",
    [ShiftTag.middle_of_week]: "Midten af ugen",
    [ShiftTag.start_of_week]: "Starten af ugen",
    [ShiftTag.weekend]: "Weekend",
  },
  en: {
    [ShiftTag.all_day]: "All days",
    [ShiftTag.end_of_week]: "End of the week",
    [ShiftTag.weekday]: "Weekday",
    [ShiftTag.middle_of_week]: "Middel of the week",
    [ShiftTag.start_of_week]: "Start of the week",
    [ShiftTag.weekend]: "Weekend",
  },
};

export const TagOptions: Record<
  ShiftTag,
  { backgroundColor: string; color: string }
> = {
  [ShiftTag.all_day]: { backgroundColor: "ebeceb", color: "2f2e2e" },
  [ShiftTag.end_of_week]: { backgroundColor: "ffe1b8", color: "814319" },
  [ShiftTag.weekday]: { backgroundColor: "d5d4fe", color: "422d94" },
  [ShiftTag.middle_of_week]: { backgroundColor: "ceefa9", color: "304e1b" },
  [ShiftTag.start_of_week]: { backgroundColor: "a9caef", color: "1b354e" },
  [ShiftTag.weekend]: { backgroundColor: "efa9ae", color: "4e1b1b" },
};

export const useTag = () => {
  const { t } = useTranslation({ id: "use-tag", locales });

  const prefix = useCallback(
    (tag: ShiftTag) => (
      <Icon
        source={`<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><circle cx='10' cy='10' r='10' fill='%23${TagOptions[tag].backgroundColor}' /></svg>`}
      />
    ),
    []
  );

  const options = useMemo(
    () =>
      Object.values(ShiftTag).map((value: ShiftTag) => ({
        label: t(value),
        prefix: prefix(value),
        value,
      })),
    [prefix, t]
  );

  const selectTag = useCallback(
    (value: ShiftTag) => options.find((o) => o.value === value),
    [options]
  );

  const selectTagValue = useCallback(
    (value: ShiftTag) => options.find((o) => o.value === value)?.value,
    [options]
  );

  const selectTagLabel = useCallback(
    (value: ShiftTag) => options.find((o) => o.value === value)?.label,
    [options]
  );

  const selectTagBackgroundColor = useCallback(
    (value: ShiftTag) => `#${TagOptions[value].backgroundColor}`,
    []
  );

  const selectTagColor = useCallback(
    (value: ShiftTag) => `#${TagOptions[value].color}`,
    []
  );

  return {
    options,
    selectTag,
    selectTagBackgroundColor,
    selectTagColor,
    selectTagLabel,
    selectTagValue,
  };
};
