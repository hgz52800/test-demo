export function EmptyState({ title, description }: { title: string; description: string }) {
  return <section className="dashboard-state" aria-live="polite"><h2>{title}</h2><p>{description}</p></section>;
}
