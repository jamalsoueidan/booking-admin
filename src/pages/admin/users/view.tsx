import { subject } from "@casl/ability";
import { LoadingPage } from "@jamalsoueidan/frontend.components.loading.loading-page";
import { ScheduleCalendar } from "@jamalsoueidan/frontend.components.schedule.schedule-calendar";
import { ScheduleModalCreateShift } from "@jamalsoueidan/frontend.components.schedule.schedule-modal-create-shift";
import { ScheduleModalEditManyShifts } from "@jamalsoueidan/frontend.components.schedule.schedule-modal-edit-many-shifts";
import { ScheduleModalEditOneShift } from "@jamalsoueidan/frontend.components.schedule.schedule-modal-edit-one-shift";
import { useStaffSchedule } from "@jamalsoueidan/frontend.state.schedule";
import { useStaffGet } from "@jamalsoueidan/frontend.state.staff";
import { AlphaCard, Page } from "@shopify/polaris";
import { Suspense, useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import { Schedule } from "@jamalsoueidan/backend.types.schedule";
import { endOfMonth } from "date-fns";
import { BadgeStatus } from "~/components/badge-status";
import { LoadingModal } from "~/components/loading/loading-modal";
import { LoadingSpinner } from "~/components/loading/loading-spinner";
import { useAbility } from "~/providers/ability-provider";
import { useTranslation } from "~/providers/translate-provider";

export const View = () => {
  const { t } = useTranslation({ id: "staff-schedule", locales });
  const ability = useAbility();
  const params = useParams();
  const [rangeDate, setRangeDate] = useState<{ start: Date; end: Date }>({
    end: endOfMonth(new Date()),
    start: new Date(),
  });

  const [date, setDate] = useState<Date>();
  const [editOneSchedule, setEditOneSchedule] = useState<Schedule>();
  const [editManySchedule, setEditManySchedule] = useState<Schedule>();

  const close = useCallback(() => {
    setDate(undefined);
    setEditManySchedule(undefined);
    setEditOneSchedule(undefined);
  }, []);

  const edit = useCallback((schedule: Schedule) => {
    if (schedule.groupId) {
      setEditManySchedule(schedule);
    } else {
      setEditOneSchedule(schedule);
    }
  }, []);

  const { data: staff } = useStaffGet({ userId: params.id || "" });

  const { data: calendar } = useStaffSchedule({
    end: rangeDate?.end,
    staff: params.id || "",
    start: rangeDate?.start,
  });

  if (!staff || !calendar) {
    return (
      <LoadingPage title={!staff ? t("loading.staff") : t("loading.data")} />
    );
  }

  const { _id, fullname, active } = staff;

  const editSchedule = ability.can("update", subject("staff", staff)) && {
    onClick: setDate,
    onClickSchedule: edit,
  };

  return (
    <Page
      fullWidth
      title={t("title", { fullname })}
      titleMetadata={<BadgeStatus active={active} />}
      backAction={{ content: "staff", url: "../" }}
      primaryAction={
        ability.can("update", subject("staff", staff))
          ? {
              content: t("edit", { fullname }),
              url: `../edit/${_id}`,
            }
          : null
      }
      secondaryActions={
        ability.can("update", subject("staff", staff))
          ? [
              {
                content: t("add"),
                onAction: () => setDate(new Date()),
              },
            ]
          : []
      }
    >
      <>
        {date && (
          <Suspense fallback={<LoadingModal />}>
            <ScheduleModalCreateShift
              selectedDate={date}
              staff={params.id || ""}
              close={close}
            />
          </Suspense>
        )}
        {editOneSchedule && (
          <Suspense fallback={<LoadingModal />}>
            <ScheduleModalEditOneShift
              schedule={editOneSchedule}
              close={close}
            />
          </Suspense>
        )}
        {editManySchedule && (
          <Suspense fallback={<LoadingModal />}>
            <ScheduleModalEditManyShifts
              schedule={editManySchedule}
              close={close}
            />
          </Suspense>
        )}
        <AlphaCard>
          <Suspense fallback={<LoadingSpinner />}>
            <ScheduleCalendar
              onChangeDate={setRangeDate}
              data={calendar}
              {...editSchedule}
            />
          </Suspense>
        </AlphaCard>
      </>
    </Page>
  );
};

const locales = {
  da: {
    add: "Tilføj vagt",
    edit: "Redigere {fullname}",
    loading: {
      data: "Henter medarbejder vagtplan",
      staff: "Henter medarbejder data",
    },
    title: "{fullname} vagtplan",
  },
  en: {
    add: "Add shift",
    edit: "Edit {fullname}",
    loading: {
      data: "Loading staff shifts",
      staff: "Loading staff data",
    },
    title: "{fullname} shifts",
  },
};
