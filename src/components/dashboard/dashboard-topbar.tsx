import { TopBar } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosition } from "~/hooks/use-position";
import { useTranslation } from "~/providers/translate-provider";

const locales = {
  da: {
    logout: "Log ud",
  },
  en: {
    logout: "Log out",
  },
};

interface DashboardTopbarProps {
  toggleNavigation: (value: any) => void;
}

export const DashboardTopbar = ({ toggleNavigation }: DashboardTopbarProps) => {
  const { t } = useTranslation({ id: "app-topbar", locales });
  const { selectPosition } = usePosition();
  const navigate = useNavigate();
  const [userMenuActive, setUserMenuActive] = useState(false);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      toggleNavigation(
        (mobileNavigationActive: boolean) => !mobileNavigationActive
      ),
    [toggleNavigation]
  );

  const userMenuActions = [
    {
      items: [
        {
          content: t("logout"),
          onAction: () => {
            localStorage.clear();
            return navigate("/");
          },
        },
      ],
    },
  ];

  const data = undefined;
  const userMenuMarkup = data ? (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={""}
      detail={selectPosition("1")}
      initials={""}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  ) : null;

  return (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );
};
