import { Shift, ShiftGetGroup, ShiftGroup } from "~/api/model";

export function isShift(shift: unknown): shift is Shift {
  if (shift === undefined) {
    return false;
  }
  return (shift as Shift)._id !== undefined;
}

export function isModifyShiftGroup(shift: unknown): shift is ShiftGroup[] {
  if (shift === undefined) {
    return false;
  }
  return Array.isArray(shift);
}

export function isGetShiftGroup(shift: unknown): shift is ShiftGetGroup {
  if (shift === undefined) {
    return false;
  }
  return (shift as ShiftGetGroup).days !== undefined;
}
