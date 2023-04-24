import { AlphaCard, EmptyState } from "@shopify/polaris";
import { useTranslation } from "~/providers/translate-provider";

export const UserEmpty = () => {
  const { t } = useTranslation({
    id: "empty-user",
    locales: {
      da: {
        heading: "Gå igang med at oprette medarbejder!",
        text: "Efterfølgende kan du tilføje timer, og tilføje medarbejder til behandlinger.",
      },
      en: {
        heading: "Team up and do even more!",
        text: "Then you'll be able to manage member profiles, working hours and who's doing what service.",
      },
    },
  });

  return (
    <AlphaCard>
      <EmptyState
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        heading={t("heading")}
      >
        <p>{t("text")}</p>
      </EmptyState>
    </AlphaCard>
  );
};
