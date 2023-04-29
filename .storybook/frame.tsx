import { Frame, TopBar } from "@shopify/polaris";
import React, { useCallback, useRef, useState } from "react";
import {
  AbilityProvider,
  defineAbilityFor,
} from "../src/providers/ability-provider";

export function FrameExample({ children }) {
  const skipToContentRef = useRef<HTMLAnchorElement>(null);

  const ability = defineAbilityFor({
    isAdmin: true,
    isOwner: true,
    isUser: true,
    userId: "1",
  });

  const [userMenuActive, setUserMenuActive] = useState(false);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );
  const userMenuActions = [
    {
      items: [{ content: "Community forums" }],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Jamal"
      detail="BySisters"
      initials="D"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const topBarMarkup = (
    <TopBar showNavigationToggle userMenu={userMenuMarkup} />
  );

  const logo = {
    width: 124,
    topBarSource:
      "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999",
    contextualSaveBarSource:
      "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999",
    url: "#",
    accessibilityLabel: "Jaded Pixel",
  };

  return (
    <Frame
      logo={logo}
      topBar={topBarMarkup}
      skipToContentTarget={skipToContentRef}
    >
      <AbilityProvider ability={ability}>{children}</AbilityProvider>
    </Frame>
  );
}
