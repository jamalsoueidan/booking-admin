import {
  AlphaCard,
  Box,
  FormLayout,
  Image,
  Layout,
  Select,
  TextField,
} from "@shopify/polaris";
import { usePosition } from "~/hooks/use-position";

import { Form } from "~/lib/react-form";
import { useTranslation } from "~/providers/translate-provider";
import { UseUserForm, useUserForm } from "./use-user-form";

export const UserForm = ({ data, method }: UseUserForm) => {
  const { fields, submit, submitErrors } = useUserForm({
    data,
    method,
  });

  const { options } = usePosition();
  const { t } = useTranslation({
    id: "staff-form",
    locales: { da, en },
  });

  return (
    <Form onSubmit={submit} method={method} submitErrors={submitErrors}>
      <Layout>
        <Layout.AnnotatedSection title={t("form.title")}>
          <AlphaCard>
            <FormLayout>
              <TextField
                label={t("fullname.label")}
                type="text"
                autoComplete="fullname"
                name="fullname"
                placeholder={t("fullname.placeholder")}
                {...fields?.fullname}
              />
              <TextField
                label={t("email.label")}
                type="email"
                autoComplete="email"
                name="email"
                placeholder={t("email.placeholder")}
                helpText={<span>{t("email.help")}</span>}
                {...fields?.email}
              />
              <TextField
                label={t("phone.label")}
                type="text"
                autoComplete="phone"
                name="phone"
                placeholder={t("phone.placeholder")}
                helpText={<span>{t("phone.help")}</span>}
                {...fields?.phone}
              />
              <TextField
                label={t("address.label")}
                type="text"
                autoComplete="address"
                name="address"
                placeholder={t("address.placeholder")}
                {...fields?.address}
              />
              <TextField
                label={t("postal.label")}
                type="text"
                autoComplete="postal"
                name="postal"
                placeholder={t("postal.placeholder")}
                helpText={<span>{t("postal.help")}</span>}
                {...fields?.postal}
              />
            </FormLayout>
          </AlphaCard>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection title={t("user.title")}>
          <AlphaCard>
            <FormLayout>
              <Select
                label={t("position.label")}
                name="position"
                options={options}
                {...fields?.position}
              />
              <TextField
                label={t("group.label")}
                type="text"
                autoComplete="false"
                name="group"
                placeholder={t("group.placeholder")}
                helpText={<span>{t("group.help")}</span>}
                {...fields?.group}
              />
            </FormLayout>
          </AlphaCard>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection title={t("image.title")}>
          <AlphaCard>
            <TextField
              label={t("avatar.label")}
              type="text"
              autoComplete="avatar"
              name="avatar"
              placeholder={t("avatar.placeholder")}
              helpText={<span>{t("avatar.help")}</span>}
              {...fields?.avatar}
            />
            {fields?.avatar.value && (
              <Box paddingBlockStart="4">
                <Image
                  source={fields?.avatar.value}
                  alt="avatar url"
                  width="100px"
                />
              </Box>
            )}
          </AlphaCard>
        </Layout.AnnotatedSection>
      </Layout>
    </Form>
  );
};

export const da = {
  address: {
    label: "Din adresse",
    placeholder: "Indtast din adresse",
  },
  avatar: {
    help: "Brug en url til at importere billedet",
    label: "Avatar Link",
    placeholder: "http://...",
  },
  created: "Medarbejder created",
  email: {
    help: "Vi bruger denne e-mailadresse til at informere dig om fremtidige aftaler.",
    label: "E-mail",
    placeholder: "Eksempel: kristina.larsen@gmail.com",
  },
  form: {
    title: "Medarbejder overblik",
  },
  fullname: {
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
    help: "Vi bruger denne mobilnummer til at informere dig om fremtidige bestillinger.",
    label: "Mobilnummer",
    placeholder: "Eksempel: +4531311234",
  },
  position: {
    label: "Title",
    title: "Din title, makeup artist, eller frisør?",
  },
  postal: {
    help: "8000, 8200",
    label: "Postnummer",
    placeholder: "Postnummer",
  },
  role: {
    help: "Brugerrettigheder",
    label: "Brugerrettigheder",
    placeholder: "Brugerrettigheder",
  },
  updated: "Medarbejder er opdateret",
  user: {
    title: "Medarbejder indstillinger",
  },
} as const;

export const en = {
  address: {
    label: "Your address",
    placeholder: "Enter your address",
  },
  avatar: {
    help: "Use url to import a picture",
    label: "Avatar URL",
    placeholder: "http://...",
  },
  created: "User created",
  email: {
    help: "We’ll use this email address to inform you about future appointments.",
    label: "Email",
    placeholder: "Example: kristina.larsen@gmail.com",
  },
  form: {
    title: "User overview",
  },
  fullname: {
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
    help: "We’ll use this phone number to inform you about future appointments.",
    label: "Phone number",
    placeholder: "Example: +4531311234",
  },
  position: {
    title: "Your position makeup artist or hair artist?",
  },
  postal: {
    help: "8000, 8220",
    label: "Postal",
    placeholder: "Postal",
  },
  role: {
    help: "User role",
    label: "User role",
    placeholder: "User role",
  },
  roles: {
    admin: "Admin",
    owner: "Owner",
    user: "User",
  },
  updated: "User has been updated",
  user: {
    title: "User Settings",
  },
};
