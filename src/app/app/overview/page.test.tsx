import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import OverviewPage from "./page";

describe("GEO overview", () => {
  beforeEach(() => vi.restoreAllMocks());
  it("shows nine metrics and supports an invalid custom date range", async () => {
    render(<OverviewPage />);
    expect(await screen.findByText("GEO 综合指数")).toBeVisible();
    expect(screen.getByRole("region", { name: "GEO 核心指标" }).querySelectorAll("article")).toHaveLength(9);
    await screen.findByText("今日增长机会");
    await (await import("@testing-library/user-event")).default.setup().click(screen.getByRole("button", { name: "自定义" }));
    const inputs = screen.getAllByLabelText(/日期/);
    await (await import("@testing-library/user-event")).default.setup().clear(inputs[0]);
    await (await import("@testing-library/user-event")).default.setup().type(inputs[0], "2026-09-25");
    await (await import("@testing-library/user-event")).default.setup().clear(inputs[1]);
    await (await import("@testing-library/user-event")).default.setup().type(inputs[1], "2026-09-20");
    expect(screen.getByText("开始日期不能晚于结束日期")).toBeVisible();
    await waitFor(() => expect(screen.getByText("品牌表现趋势")).toBeVisible());
  });
});
