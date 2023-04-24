import { Shift, ShiftGroup } from "~/api/model";

export const isShiftGroup = (
  shift: Shift | ShiftGroup
): shift is ShiftGroup => {
  return shift.groupId !== undefined;
};
