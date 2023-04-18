import { TopBar } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { User } from "~/api/model";
import { HelperText } from "~/helpers/helper-text";
import { usePosition } from "~/hooks/use-position";
import { getToken } from "~/providers/ability-provider";
import { useTranslation } from "~/providers/translate-provider";
import { AuthRole } from "~/types/auth-role";

const locales = {
  da: {
    logout: "Log ud",
  },
  en: {
    logout: "Log out",
  },
};

interface AppTopBarProps {
  toggleNavigation: (value: any) => void;
}

export const AdminTopbar = ({ toggleNavigation }: AppTopBarProps) => {
  const data = useLoaderData() as User;
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

  // we should consider removing the code below!?
  const parseToken = getToken();
  let role = parseToken?.role === AuthRole.admin ? "A" : "U";
  if (parseToken?.role === AuthRole.owner) {
    role = "O";
  }

  const userMenuMarkup = data ? (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={data?.fullname.split(" ").map(HelperText.titlize).join(" ")}
      detail={selectPosition(data?.position)}
      initials={role}
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
