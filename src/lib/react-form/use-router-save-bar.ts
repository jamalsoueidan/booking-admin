import { FieldBag } from "@shopify/react-form";

import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "~/providers/modal";
import { useSaveBar } from "~/providers/save-bar";
import { useTranslation } from "~/providers/translate-provider";
import { useRouterSubmit } from "./use-router-submit";
import {
  UseRouterSubmit,
  UseRouterSubmitInput,
} from "./use-router-submit.types";

export function useRouterSaveBar<T extends FieldBag>(
  input: UseRouterSubmitInput<T>
): UseRouterSubmit<T> {
  const navigate = useNavigate();
  const form = useRouterSubmit<T>(input);
  const modal = useModal();
  const { t } = useTranslation({ id: "use-router-save-bar", locales });

  const leave = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const closeModal = useCallback(() => {
    modal.update({
      open: false,
    });
  }, [modal]);

  const discard = useCallback(() => {
    if (input.method === "put" && form.dirty) {
      modal.update({
        open: true,
      });
    } else {
      leave();
    }
  }, [form.dirty, input.method, leave, modal]);

  const { show, hide, updateSaveAction } = useSaveBar({
    saveAction: {
      onAction: form.submit,
    },
    discardAction: {
      onAction: discard,
    },
  });

  useEffect(() => {
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
    show();

    return () => {
      hide();
      closeModal();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (input.method === "post") {
      updateSaveAction({ disabled: !form.dirty });
    }
    if (input.method === "put") {
      form.dirty ? show() : hide();
    }
  }, [form.dirty, hide, input.method, show, updateSaveAction]);

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
