import { Navigation } from "@shopify/polaris";
import {
  CalendarMajor,
  CalendarTickMajor,
  CollectionsMajor,
  CustomersMajor,
  ExitMajor,
  HomeMajor,
  ProfileMajor,
  SettingsMajor,
} from "@shopify/polaris-icons";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "~/providers/translate-provider";

type AdminNavigationProps = {
  toggle: () => void;
};
export const AdminNavigation = ({ toggle }: AdminNavigationProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation({ id: "app-navigation", locales });

  const nav = useCallback(
    (path: string) => () => {
      navigate(path);
      toggle();
    },
    [navigate, toggle]
  );

  return (
    <Navigation location="/">
      <Navigation.Section
        title={t("booking.title")}
        items={[
          {
            icon: HomeMajor,
            label: t("booking.dashboard"),
            onClick: nav("/admin"),
          },
          {
            icon: CalendarTickMajor,
            label: t("booking.bookings"),
            onClick: nav("/admin/bookings"),
          },
          {
            icon: CollectionsMajor,
            label: t("booking.collections"),
            onClick: nav("/admin/collections"),
          },
          {
            icon: CustomersMajor,
            label: t("booking.users"),
            onClick: nav("/admin/users"),
          },
        ]}
      />
      <Navigation.Section
        title={t("user.title")}
        items={[
          {
            icon: CalendarMajor,
            label: t("user.schedules"),
            onClick: nav("/admin/my/schedules"),
          },
          {
            icon: ProfileMajor,
            label: t("user.account"),
            onClick: nav("/admin/my/account"),
          },
          {
            icon: SettingsMajor,
            label: t("user.settings"),
            onClick: nav("/admin/my/settings"),
          },
          {
            icon: ExitMajor,
            label: t("user.logout"),
            onClick: () => {
              localStorage.clear();
              return nav("/");
            },
          },
        ]}
      />
    </Navigation>
  );
};

const locales = {
  da: {
    booking: {
      bookings: "Bestillinger",
      collections: "Produkter",
      dashboard: "Dashboard",
      users: "Medarbejder",
      title: "BySisters",
    },
    user: {
      account: "Min konto",
      logout: "Log ud",
      schedules: "Min vagtplan",
      settings: "Min Indstillinger",
      title: "Profil",
    },
  },
  en: {
    booking: {
      bookings: "My bookings",
      collections: "Products",
      dashboard: "Dashboard",
      users: "User",
      title: "Application",
    },
    user: {
      account: "My account",
      logout: "Logout",
      schedules: "My shifts",
      settings: "My settings",
      title: "Profile",
    },
  },
};
