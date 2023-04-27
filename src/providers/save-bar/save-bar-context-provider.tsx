import { ContextualSaveBar, ContextualSaveBarProps } from "@shopify/polaris";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "../translate-provider";
import { SaveBarContext } from "./save-bar-context";

export interface SaveBarProviderProps {
  children?: JSX.Element;
}

export const SaveBarProvider = ({ children }: SaveBarProviderProps) => {
  const { t } = useTranslation({ id: "save-bar-provider", locales });

  const [visibility, updateVisibility] = useState<boolean>(false);

  const saveAction = useRef<() => void>();
  const discardAction = useRef<() => void>();
  const contextual = useRef<ContextualSaveBarProps>();

  const show = useCallback(() => {
    updateVisibility(true);
  }, []);

  const hide = useCallback(() => {
    updateVisibility(false);
  }, []);

  const onAction = useCallback(() => {
    if (saveAction.current) {
      saveAction.current();
    }
  }, []);

  const onDiscard = useCallback(() => {
    if (discardAction.current) {
      discardAction.current();
    }
  }, []);

  const reset = useCallback(() => {
    contextual.current = {
      message: t("unsaved"),
      discardAction: {
        content: t("discard"),
        onAction: onDiscard,
      },
      saveAction: {
        content: t("save"),
        onAction: onAction,
      },
    };
  }, [onAction, onDiscard, t]);

  const update = (value: ContextualSaveBarProps) => {
    contextual.current = {
      ...value,
      ...contextual.current,
      saveAction: {
        ...value?.saveAction,
        onAction: onAction,
      },
      discardAction: {
        ...value?.discardAction,
        onAction: onDiscard,
      },
    };
    discardAction.current = value.discardAction?.onAction;
    saveAction.current = value.saveAction?.onAction;
  };

  return (
    <SaveBarContext.Provider value={{ update, show, hide, reset }}>
      {visibility ? <ContextualSaveBar {...contextual.current} /> : null}
      {children}
    </SaveBarContext.Provider>
  );
};

const locales = {
  da: {
    discard: "Annullere",
    save: "Gem",
    unsaved: "Ikke-gemte ændringer",
  },
  en: {
    discard: "Discard",
    save: "Save",
    unsaved: "Unsaved changes",
  },
};
