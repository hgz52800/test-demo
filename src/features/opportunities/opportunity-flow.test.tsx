import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { opportunities } from "@/lib/mock/fixtures";
import { resetCreatedTasks } from "@/lib/mock/mock-services";
import { OpportunityFlow } from "./opportunity-flow";
describe("opportunity flow", () => {
  beforeEach(() => resetCreatedTasks());
  it("opens evidence, previews a mock plan and creates a pending demo task", async () => {
    render(<OpportunityFlow opportunity={opportunities[0]} onTaskCreated={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: "生成优化方案" }));
    expect(await screen.findByText("模拟生成" )).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "创建演示任务" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(/待处理/));
  });
});
