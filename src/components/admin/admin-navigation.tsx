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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "~/providers/translate-provider";

export const AdminNavigation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation({ id: "app-navigation", locales });
  return (
    <Navigation location="/">
      <Navigation.Section
        title={t("booking.title")}
        items={[
          {
            icon: HomeMajor,
            label: t("booking.dashboard"),
            onClick: () => navigate("/admin"),
          },
          {
            icon: CalendarTickMajor,
            label: t("booking.bookings"),
            onClick: () => navigate("/admin/bookings"),
          },
          {
            icon: CollectionsMajor,
            label: t("booking.collections"),
            onClick: () => navigate("/admin/collections"),
          },
          {
            icon: CustomersMajor,
            label: t("booking.user"),
            onClick: () => navigate("/admin/user"),
          },
        ]}
      />
      <Navigation.Section
        title={t("user.title")}
        items={[
          {
            icon: CalendarMajor,
            label: t("user.schedules"),
            onClick: () => navigate("/admin/my/schedules"),
          },
          {
            icon: ProfileMajor,
            label: t("user.account"),
            onClick: () => navigate("/admin/my/account"),
          },
          {
            icon: SettingsMajor,
            label: t("user.settings"),
            onClick: () => navigate("/admin/my/settings"),
          },
          {
            icon: ExitMajor,
            label: t("user.logout"),
            onClick: () => {
              localStorage.clear();
              return navigate("/");
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
      user: "Medarbejder",
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
      user: "User",
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
