import { lengthMoreThan, notEmpty, useField } from "@shopify/react-form";
import { User } from "~/api/model";
import { Validators } from "~/helpers/validators";
import { useTranslation } from "~/providers/translate-provider";

import { UseRouterSubmitMethods, useRouterSaveBar } from "~/lib/react-form";
import { usePosition } from "./use-position";

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
      address: useField({
        validates: [notEmpty(t("address.error"))],
        value: data?.address || "",
      }),
      avatar: useField({
        validates: [notEmpty(t("avatar.error"))],
        value: data?.avatar || "",
      }),
      email: useField({
        validates: [
          notEmpty(t("email.error_empty")),
          Validators.isEmail(t("email.empty_invalid_email")),
        ],
        value: data?.email || "",
      }),
      fullname: useField({
        validates: [
          notEmpty(t("fullname.error_empty")),
          lengthMoreThan(3, t("fullname.error_short")),
        ],
        value: data?.fullname || "",
      }),
      phone: useField({
        validates: [
          notEmpty(t("phone.error_empty")),
          Validators.isPhoneNumber(t("phone.error_invalid")),
        ],
        value: data?.phone || "",
      }),
      position: useField({
        validates: [notEmpty(t("position.empty"))],
        value: data?.position || options[0].value,
      }),
      postal: useField({
        validates: [notEmpty(t("postal.empty"))],
        value: data?.postal,
      }),
      group: useField({
        validates: [notEmpty("group must be filled")],
        value: data?.group || "",
      }),
      active: useField({
        validates: [],
        value: data?.active || true,
      }),
    },
  });
};

export const locales = {
  da: {
    address: {
      error: "Address skal være udfyldt",
      label: "Din adresse",
      placeholder: "Indtast din adresse",
    },
    avatar: {
      error: "Avatar skal være udfyldt",
      help: "Brug en url til at importere billedet",
      label: "Avatar Link",
      placeholder: "http://...",
    },
    email: {
      empty_invalid_email: "Forkert email",
      error_empty: "Email skal være udfyldt",
      help: "Vi bruger denne e-mailadresse til at informere dig om fremtidige aftaler.",
      label: "E-mail",
      placeholder: "Eksempel: kristina.larsen@gmail.com",
    },
    fullname: {
      error_empty: "Fuldnavn skal være udfyldt",
      error_short: "Fuldnavn er kort",
      label: "Fuldnavn",
      placeholder: "Eksempel: Kristina Larsen",
    },
    group: {
      help: "Skriv samme gruppenavn for de bruger der skal arbejde sammen",
      label: "Gruppe",
      placeholder: "Angive gruppe",
    },
    image: {
      title: "Vedhæft",
    },
    phone: {
      error_empty: "Mobilnummer skal være udfyldt",
      error_invalid: "Mobilnummer er ikke gyldig",
      help: "Vi bruger denne mobilnummer til at informere dig om fremtidige bestillinger.",
      label: "Mobilnummer",
      placeholder: "Eksempel: +4531311234",
    },
    position: {
      empty: "Din title skal være valgt",
      label: "Title",
      title: "Din title, makeup artist, eller frisør?",
    },
    postal: {
      empty: "Du skal udfylde postnummer",
      help: "8000, 8200",
      label: "Postnummer",
      placeholder: "Postnummer",
    },
  },
  en: {
    address: {
      error: "Address must be filled",
      label: "Your address",
      placeholder: "Enter your address",
    },
    avatar: {
      error: "Avatar must be filled",
      help: "Use url to import a picture",
      label: "Avatar URL",
      placeholder: "http://...",
    },
    email: {
      empty_invalid_email: "Email is invalid",
      error_empty: "Email must be filled",
      help: "We’ll use this email address to inform you about future appointments.",
      label: "Email",
      placeholder: "Example: kristina.larsen@gmail.com",
    },
    fullname: {
      error_empty: "Fullname must be filled",
      error_short: "Fullname is short",
      label: "Full name",
      placeholder: "Example: Kristina Larsen",
    },
    group: {
      help: "Write same group name for the same users that will work together",
      label: "Group",
      placeholder: "Write group",
    },
    image: {
      title: "Upload",
    },
    phone: {
      error_empty: "Phone nummer must be filled",
      error_invalid: "Phone nummer is invalid",
      help: "We’ll use this phone number to inform you about future appointments.",
      label: "Phone number",
      placeholder: "Example: +4531311234",
    },
    position: {
      empty: "Position must be filled",
      title: "Your position makeup artist or hair artist?",
    },
    postal: {
      empty: "Postal must be filled",
      help: "8000, 8220",
      label: "Postal",
      placeholder: "Postal",
    },
  },
};
