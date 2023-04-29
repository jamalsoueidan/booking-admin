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
import { getToken } from "~/providers/ability-provider";
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

  const token = getToken();

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
            label: t("user.shifts"),
            onClick: nav(`/admin/my/${token.userId}/shifts`),
          },
          {
            icon: ProfileMajor,
            label: t("user.user"),
            onClick: nav(`/admin/my/${token.userId}/user`),
          },
          {
            icon: SettingsMajor,
            label: t("user.settings"),
            onClick: nav(`/admin/my/${token.userId}/settings`),
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
      user: "Min konto",
      logout: "Log ud",
      shifts: "Min vagtplan",
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
      user: "My user",
      logout: "Logout",
      shifts: "My shifts",
      settings: "My settings",
      title: "Profile",
    },
  },
};
