export function LoadingState({ label = "正在加载…" }: { label?: string }) {
  return <div className="dashboard-state" role="status"><span className="loading-spinner" aria-hidden="true"/>{label}</div>;
}
