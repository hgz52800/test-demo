import { WorkspaceShell } from "@/components/workspace/workspace-shell";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <WorkspaceShell>{children}</WorkspaceShell>;
}
