import { Frame, Icon, Link, Text, TopBar } from "@shopify/polaris";
import { LanguageMinor } from "@shopify/polaris-icons";
import { ReactNode, useCallback, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "~/hooks/use-translation";
import { useSettings } from "~/providers/setting-provider";
import logo from "../../assets/logo.avif";

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  text-align: center;
`;

const logoOptions = {
  accessibilityLabel: "Logo",
  contextualSaveBarSource: "asd",
  topBarSource: logo,
  url: "/",
  width: 124,
};

interface AuthenticationFrameProps {
  children: ReactNode;
}

export const AuthenticationFrame = ({ children }: AuthenticationFrameProps) => {
  const { update } = useSettings();

  const { t } = useTranslation({
    id: "topbar",
    locales: {
      da: {
        change_language: "Skift sprog",
        danish: "Dansk",
        english: "Engelsk",
        rights: "Alle rettigheder forbeholdt",
      },
      en: {
        change_language: "Change language",
        danish: "Danish",
        english: "English",
        rights: "All rights reserved",
      },
    },
  });
  const [, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    []
  );

  const secondaryMenuMarkup = (
    <TopBar.Menu
      activatorContent={
        <span>
          <Icon source={LanguageMinor} />
          <Text variant="bodySm" as="span" visuallyHidden>
            {t("change_language")}
          </Text>
        </span>
      }
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[
        {
          items: [
            {
              content: t("danish"),
              onAction: () => {
                update({ language: "da" });
              },
            },
            {
              content: t("english"),
              onAction: () => {
                update({ language: "en" });
              },
            },
          ],
        },
      ]}
    />
  );

  return (
    <Frame
      logo={logoOptions}
      topBar={
        <TopBar
          showNavigationToggle
          secondaryMenu={secondaryMenuMarkup}
          onNavigationToggle={toggleMobileNavigationActive}
        />
      }
    >
      {children}
      <Footer>
        <p>
          {t("rights")} <Link url="https://wwww.by-sisters.dk">BySisters</Link>{" "}
          ©
        </p>
        <p>Version 1.0.1</p>
      </Footer>
    </Frame>
  );
};
