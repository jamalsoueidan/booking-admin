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
  const [, forceUpdate] = useState<boolean>();

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

  const reset = useCallback(
    (value: ContextualSaveBarProps) => {
      contextual.current = {
        message: t("unsaved"),
        ...value,
        ...contextual.current,
        saveAction: {
          content: t("save"),
          ...value?.saveAction,
          onAction: onAction,
        },
        discardAction: {
          content: t("discard"),
          ...value?.discardAction,
          onAction: onDiscard,
        },
      };
      discardAction.current = value.discardAction?.onAction;
      saveAction.current = value.saveAction?.onAction;
    },
    [onAction, onDiscard, t]
  );

  const updateSaveAction = useCallback(
    (value: ContextualSaveBarProps["saveAction"]) => {
      if (contextual.current && contextual.current.saveAction) {
        contextual.current.saveAction.disabled = value?.disabled;
        forceUpdate((prev) => !prev);
      }
    },
    []
  );

  return (
    <SaveBarContext.Provider value={{ updateSaveAction, show, hide, reset }}>
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
