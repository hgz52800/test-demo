import type { DateRange } from "@/lib/domain/types";
export type RangePreset = 7 | 30 | 90;
export function getPresetDateRange(preset: RangePreset, today: string): DateRange {
  const end = new Date(`${today}T00:00:00Z`);
  if (Number.isNaN(end.valueOf())) throw new Error("日期无效");
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (preset - 1));
  return { from: start.toISOString().slice(0, 10), to: today };
}
export function validateDateRange(range: DateRange): { ok: true } | { ok: false; message: string } {
  const valid = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
  if (!valid(range.from) || !valid(range.to)) return { ok: false, message: "请选择有效的开始和结束日期" };
  if (range.from > range.to) return { ok: false, message: "开始日期不能晚于结束日期" };
  return { ok: true };
}
