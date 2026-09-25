import { describe, expect, it } from "vitest";
import { getPresetDateRange, validateDateRange } from "./range";
describe("date ranges", () => {
  it.each([[7, "2026-09-18"], [30, "2026-08-26"], [90, "2026-06-27"]] as const)("includes today for %i days", (days, from) => {
    expect(getPresetDateRange(days, "2026-09-24")).toEqual({ from, to: "2026-09-24" });
  });
  it("accepts valid ranges and rejects reversed or impossible dates", () => {
    expect(validateDateRange({ from: "2026-09-01", to: "2026-09-24" })).toEqual({ ok: true });
    expect(validateDateRange({ from: "2026-09-25", to: "2026-09-24" }).ok).toBe(false);
    expect(validateDateRange({ from: "2026-02-30", to: "2026-03-01" }).ok).toBe(false);
  });
});
