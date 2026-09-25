import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import AppLayout from "./layout";

describe("workspace layout", () => {
  it("shows the navigation and opens/closes the mobile drawer", async () => {
    const user = userEvent.setup();
    render(<AppLayout><div>工作区内容</div></AppLayout>);
    expect(screen.getAllByRole("link", { name: "GEO 总驾驶舱" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("navigation", { name: "主导航" })[0].querySelectorAll("a")).toHaveLength(13);
    await user.click(screen.getByRole("button", { name: "打开导航" }));
    expect(screen.getByRole("dialog", { name: "主导航" })).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "主导航" })).not.toBeInTheDocument();
  });
});
