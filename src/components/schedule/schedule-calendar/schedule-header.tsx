import {
  Button,
  ButtonGroup,
  HorizontalGrid,
  HorizontalStack,
} from "@shopify/polaris";
import { ResetMinor } from "@shopify/polaris-icons";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarTitle } from "~/components/calendar";
import { useCalendar } from "~/components/calendar/use-calendar";
import { InputTags, InputTagsField } from "~/components/inputs/input-tags";
import { useFieldParam } from "~/lib/form/use-field-param";
import { useTranslation } from "~/providers/translate-provider";

export const ScheduleHeader = () => {
  const { calendar } = useCalendar();
  const navigate = useNavigate();
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

  return (
    <HorizontalGrid columns={["oneThird", "twoThirds"]}>
      <HorizontalStack gap="4">
        <CalendarTitle />
        <ButtonGroup segmented>
          <Button onClick={handlePrev} size="slim">
            &#60;
          </Button>
          <Button onClick={handleNext} size="slim">
            &#62;
          </Button>
        </ButtonGroup>
      </HorizontalStack>
      <HorizontalStack gap="4" align="end" blockAlign="end">
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
