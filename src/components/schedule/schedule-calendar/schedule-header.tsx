import { Button, ButtonGroup, Columns, Inline } from "@shopify/polaris";
import { ResetMinor } from "@shopify/polaris-icons";
import { useCallback } from "react";
import { CalendarTitle } from "~/components/calendar";
import { useCalendar } from "~/components/calendar/useCalendar";
import { InputTags, InputTagsField } from "~/components/inputs/input-tags";
import { useFieldParam } from "~/lib/form/useFieldParam";
import { useTranslation } from "~/providers/translate-provider";

export const ScheduleHeader = () => {
  const calendar = useCalendar();
  const { t } = useTranslation({ id: "schedule-calendar", locales });
  const tag = useFieldParam<InputTagsField>({
    value: "middle_of_week",
    validates: [],
    name: "tag",
  });

  const reset = useCallback(() => {
    tag.reset();
    calendar?.getApi().today();
  }, [tag]);

  const handlePrev = useCallback(() => {
    calendar?.getApi().prev();
  }, []);

  const handleNext = useCallback(() => {
    calendar?.getApi().next();
  }, []);

  return (
    <Columns columns={["oneThird", "twoThirds"]}>
      <Inline gap="4">
        <CalendarTitle />
        <ButtonGroup segmented>
          <Button onClick={handlePrev} size="slim">
            &#60;
          </Button>
          <Button onClick={handleNext} size="slim">
            &#62;
          </Button>
        </ButtonGroup>
      </Inline>
      <Inline gap="4" align="end">
        <Button onClick={reset} icon={ResetMinor}>
          {t("reset")}
        </Button>
        <InputTags
          field={tag}
          input={{
            labelHidden: true,
            placeholder: t("input.tag"),
            size: "medium",
          }}
        />
      </Inline>
    </Columns>
  );
};

const locales = {
  da: {
    dayGridMonth: "Måned",
    input: {
      tag: "Filtre tag",
    },
    reset: "Nulstil",
  },
  en: {
    dayGridMonth: "Month",
    input: {
      tag: "Filter by tag",
    },
    reset: "Reset",
  },
};
