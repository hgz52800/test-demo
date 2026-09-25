import { render, screen } from "@testing-library/react";
import Home from "./page";
import { it, expect } from "vitest";

it("shows the product identity and demo entry link", () => {
  render(<Home />);

  expect(screen.getByText("海心 AI · GEO 智能增长系统")).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /进入演示工作台/ })[0]).toHaveAttribute("href", "/login");
});
