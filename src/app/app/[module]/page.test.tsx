import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { resolvePreviewModule } from "./page";
import { ModulePreview } from "@/components/preview/module-preview";
it("maps only registered modules to an explicit preview", () => {
  expect(resolvePreviewModule("diagnostics")).toBe("品牌 AI 体检");
  expect(resolvePreviewModule("made-up-module")).toBeUndefined();
  render(<ModulePreview title={resolvePreviewModule("monitoring")!}/>);
  expect(screen.getByRole("heading", { name: "AI 曝光监测" })).toBeVisible();
  expect(screen.getByText("后续阶段")).toBeVisible();
  expect(screen.getByRole("link", { name: /返回驾驶舱/ })).toHaveAttribute("href", "/app/overview");
});
