import type { ButtonHTMLAttributes, ReactNode } from "react";
export function Button({ children, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary"; children: ReactNode }) {
  return <button className={`button button-${variant}`} {...props}>{children}</button>;
}
