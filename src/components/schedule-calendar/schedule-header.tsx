import {
  Button,
  ButtonGroup,
  HorizontalGrid,
  HorizontalStack,
} from "@shopify/polaris";
import { ResetMinor } from "@shopify/polaris-icons";
import { isBefore } from "date-fns";
import { useCallback } from "react";
import { CalendarTitle } from "~/components/calendar";
import { useCalendar } from "~/components/calendar/use-calendar";
import { InputTags, InputTagsField } from "~/components/inputs/input-tags";
import { useFieldParam } from "~/lib/react-form/use-field-param";
import { useTranslation } from "~/providers/translate-provider";

export const ScheduleHeader = () => {
  const { calendar } = useCalendar();
  const { t } = useTranslation({ id: "schedule-calendar", locales });

  const tag = useFieldParam<InputTagsField>({
    value: "middle_of_week",
    validates: [],
    name: "tag",
  });

  const reset = useCallback(() => {
    tag.reset();
    calendar?.getApi().today();
  }, [tag, calendar]);

  const handlePrev = useCallback(() => {
    calendar?.getApi().prev();
  }, [calendar]);

  const handleNext = useCallback(() => {
    calendar?.getApi().next();
  }, [calendar]);

  const currentDate = calendar?.getApi().getDate() || new Date();
  const todayDate = new Date();
  const disabled = isBefore(currentDate.getTime(), todayDate.getTime());

  return (
    <HorizontalGrid columns={{ md: "1", lg: "2" }} gap="4">
      <HorizontalStack>
        <CalendarTitle />
      </HorizontalStack>
      <HorizontalStack gap="4" align="end" blockAlign="end">
        <ButtonGroup segmented>
          <Button onClick={handlePrev} disabled={disabled}>
            &#60;
          </Button>
          <Button onClick={handleNext}>&#62;</Button>
        </ButtonGroup>
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
      </HorizontalStack>
    </HorizontalGrid>
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
