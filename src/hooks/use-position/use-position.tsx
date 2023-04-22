import { useCallback, useMemo } from "react";
import { useTranslation } from "../../providers/translate-provider";

// https://www.youtube.com/watch?v=a_m7jxrTlaw&list=PLIvujZeVDLMx040-j1W4WFs1BxuTGdI_b&index=3&ab_channel=MattPocock
export type Positions = "1" | "2" | Omit<string, "1" | "2">;

const locales = {
  da: {
    hairdresser: "Frisør",
    makeup: "Makeup",
  },
  en: {
    hairdresser: "Hairdresser",
    makeup: "Makeup",
  },
};

interface UseTagOptionsReturn {
  options: UseTagOptions[];
  selectPosition: (value: Positions) => string;
}

interface UseTagOptions {
  label: string;
  value: string;
}

export const usePosition = (): UseTagOptionsReturn => {
  const { t } = useTranslation({ id: "positions", locales });

  const options: UseTagOptions[] = useMemo(
    () => [
      { label: t("makeup"), value: "1" },
      { label: t("hairdresser"), value: "2" },
    ],
    [t]
  );

  const selectPosition = useCallback(
    (value: Positions) => {
      const option = options.find((o) => o.value === value);
      if (!option) {
        // do we keep the throw error here?
        // if so we need to validate positions in the DB, API, ENUM restricted!
        return "unknown";
      }
      return option?.label || "";
    },
    [options]
  );

  return {
    options,
    selectPosition,
  };
};
