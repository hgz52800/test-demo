export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <section className="dashboard-state error-state" role="alert"><p>{message}</p><button className="button button-secondary" onClick={onRetry}>重试</button></section>;
}
