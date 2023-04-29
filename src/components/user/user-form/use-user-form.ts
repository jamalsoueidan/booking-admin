import { lengthMoreThan, notEmpty, useField } from "@shopify/react-form";
import { User } from "~/api/model";
import { Validators } from "~/helpers/validators";
import { useTranslation } from "~/providers/translate-provider";

import { UseRouterSubmitMethods, useRouterSaveBar } from "~/lib/react-form";
import { usePosition } from "../../../hooks/use-position";

export type UseUserForm = {
  data?: User;
  method: UseRouterSubmitMethods;
};

export const useUserForm = (
  { data, method }: UseUserForm = { method: "post" }
) => {
  const { options } = usePosition();
  const { t } = useTranslation({
    id: "use-user-form",
    locales,
  });

  return useRouterSaveBar({
    method,
    fields: {
      fullname: useField({
        validates: [
          notEmpty(t("fullname.error_empty")),
          lengthMoreThan(3, t("fullname.error_short")),
        ],
        value: data?.fullname || "",
      }),
      email: useField({
        validates: [
          notEmpty(t("email.error_empty")),
          Validators.isEmail(t("email.empty_invalid_email")),
        ],
        value: data?.email || "",
      }),
      phone: useField({
        validates: [
          notEmpty(t("phone.error_empty")),
          Validators.isPhoneNumber(t("phone.error_invalid")),
        ],
        value: data?.phone || "",
      }),
      address: useField({
        validates: [notEmpty(t("address.error"))],
        value: data?.address || "",
      }),
      postal: useField({
        validates: [notEmpty(t("postal.empty"))],
        value: data?.postal,
      }),
      avatar: useField({
        validates: [notEmpty(t("avatar.error"))],
        value: data?.avatar || "",
      }),
      position: useField({
        validates: [notEmpty(t("position.empty"))],
        value: data?.position || options[0].value,
      }),
      group: useField({
        validates: [notEmpty("group must be filled")],
        value: data?.group || "",
      }),
      active: useField({
        validates: [],
        value: data?.active || true,
      }),
      language: useField({
        validates: [],
        value: data?.language || "da",
      }),
      timeZone: useField({
        validates: [],
        value: data?.timeZone || "Europe/Copenhagen",
      }),
    },
  });
};

export const locales = {
  da: {
    address: {
      error: "Address skal være udfyldt",
    },
    avatar: {
      error: "Avatar skal være udfyldt",
    },
    email: {
      empty_invalid_email: "Forkert email",
      error_empty: "Email skal være udfyldt",
    },
    fullname: {
      error_empty: "Fuldnavn skal være udfyldt",
      error_short: "Fuldnavn er kort",
    },
    group: {
      help: "Skriv samme gruppenavn for de bruger der skal arbejde sammen",
    },
    image: {
      title: "Vedhæft",
    },
    phone: {
      error_empty: "Mobilnummer skal være udfyldt",
      error_invalid: "Mobilnummer er ikke gyldig",
    },
    position: {
      empty: "Din title skal være valgt",
    },
    postal: {
      empty: "Du skal udfylde postnummer",
    },
  },
  en: {
    address: {
      error: "Address must be filled",
    },
    avatar: {
      error: "Avatar must be filled",
    },
    email: {
      empty_invalid_email: "Email is invalid",
      error_empty: "Email must be filled",
    },
    fullname: {
      error_empty: "Fullname must be filled",
      error_short: "Fullname is short",
    },
    group: {},
    image: {
      title: "Upload",
    },
    phone: {
      error_empty: "Phone nummer must be filled",
      error_invalid: "Phone nummer is invalid",
    },
    position: {
      empty: "Position must be filled",
    },
    postal: {
      empty: "Postal must be filled",
    },
  },
};
