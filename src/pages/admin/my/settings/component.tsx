import { AlphaCard, FormLayout, Layout, Page } from "@shopify/polaris";
import { useEffect } from "react";
import { useActionData, useLoaderData } from "react-router-dom";
import { InputLanguage } from "~/components/inputs/input-language";
import { InputTimeZone } from "~/components/inputs/input-time-zone";
import { useUserForm } from "~/components/user/user-form/use-user-form";
import { Form } from "~/lib/react-form";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";
import { isUser } from "~/types/user";
import { action } from "./action";
import { loader } from "./loader";

export function Component() {
  const { show } = useToast();
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;

  const { t } = useTranslation({
    id: "my-settings",
    locales: { da, en },
  });

  //https://codesandbox.io/s/1wpxz?file=/src/MyForm.tsx:2457-2473
  const { fields, submit, submitErrors } = useUserForm({
    method: "put",
    data: loaderData,
  });

  useEffect(() => {
    if (isUser(actionData)) {
      show({ content: t("toast") });
    }
  }, [actionData, show, t]);

  return (
    <Form onSubmit={submit} method="PUT" submitErrors={submitErrors}>
      <Page fullWidth title={t("title")}>
        <Layout>
          <Layout.AnnotatedSection
            title={t("user_settings.title")}
            description={t("user_settings.subtitle")}
          >
            <AlphaCard>
              <FormLayout>
                <InputTimeZone {...fields.timeZone} />
                <InputLanguage {...fields.language} />
              </FormLayout>
            </AlphaCard>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    </Form>
  );
}

const da = {
  title: "Min Indstillinger",
  toast: "Ændringer er blevet opdateret",
  user_settings: {
    subtitle: "Ændre udefra din preference",
    title: "Bruger indstillinger",
  },
};

const en: typeof da = {
  title: "My Settings",
  toast: "Changes is updated",
  user_settings: {
    subtitle: "Change to whatever you like",
    title: "User Settings",
  },
};
