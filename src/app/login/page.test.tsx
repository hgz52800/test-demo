import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import LoginPage from "./page";
it("offers a demo workspace without asking for credentials", () => {
  render(<LoginPage/>);
  expect(screen.queryByLabelText(/密码|password/i)).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: /进入海心家居演示工作区/ })).toHaveAttribute("href", "/app/overview");
  expect(screen.getByText(/演示入口不会收集账号或密码/)).toBeVisible();
});
