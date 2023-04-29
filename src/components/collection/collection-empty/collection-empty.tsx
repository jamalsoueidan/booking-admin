import { AlphaCard, EmptyState } from "@shopify/polaris";
import { useTranslation } from "~/providers/translate-provider";

export const CollectionEmpty = () => {
  const { t } = useTranslation({ id: "collection-empty", locales });

  return (
    <AlphaCard>
      <EmptyState
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        heading={t("title")}
      >
        <p>{t("text")} 🚀</p>
      </EmptyState>
    </AlphaCard>
  );
};

const locales = {
  da: {
    choose_collections: "Ingen kollektion(er)",
    text: "Der er ikke tilføjet kollektioner endnu",
    title: "Begynd at tag imod reservationer i din butik.",
  },
  en: {
    choose_collections: "Choose collection(s)",
    text: "There is none collection(s) in store yet!",
    title: "Start collecting appointments on your store.",
  },
};
