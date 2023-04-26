import { FieldBag } from "@shopify/react-form";

import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "~/providers/modal";
import { useSaveBar } from "~/providers/save-bar";
import { useTranslation } from "~/providers/translate-provider";
import {
  UseRouterSubmit,
  UseRouterSubmitInput,
  useRouterSubmit,
} from "./use-router-submit";

export function useRouterSaveBar<T extends FieldBag>(
  input: UseRouterSubmitInput<T>
): UseRouterSubmit<T> {
  const form = useRouterSubmit<T>(input);
  const { t } = useTranslation({ id: "use-router-save-bar", locales });

  const navigate = useNavigate();
  const { updateSaveAction, updateDiscardAction, updateVisibility } =
    useSaveBar();

  const modal = useModal();

  const leave = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const closeModal = useCallback(() => {
    modal.update({
      open: false,
    });
  }, [modal]);

  const discard = useCallback(() => {
    if (input.method === "put") {
      modal.update({
        open: true,
      });
    } else {
      leave();
    }
  }, [input.method, leave, modal]);

  useEffect(() => {
    updateSaveAction({ onAction: form.submit });
    updateDiscardAction({ onAction: discard });
    if (input.method === "post") {
      updateVisibility(true);
    }

    modal.update({
      title: t("title"),
      content: t("content"),
      primaryAction: {
        content: t("leave"),
        onAction: leave,
      },
      secondaryActions: [
        {
          content: t("stay"),
          onAction: closeModal,
        },
      ],
    });

    return () => {
      updateVisibility(false);
      closeModal();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (input.method === "post") {
      updateSaveAction({ disabled: !form.dirty });
    }
    if (input.method === "put") {
      updateVisibility(form.dirty);
    }
  }, [form.dirty, input.method, updateSaveAction, updateVisibility]);

  return form;
}

export const locales = {
  da: {
    title: "Vil du forlade siden med ikke-gemte ændringer?",
    content: "Forlader du denne side vil det slette alle ikke-gemte ændringer.",
    leave: "Forlad",
    stay: "Forsæt",
  },
  en: {
    title: "Leave page with unsaved changes?",
    content: "Leaving this page will delete all unsaved changes.",
    leave: "Leave",
    stay: "Stay",
  },
};
