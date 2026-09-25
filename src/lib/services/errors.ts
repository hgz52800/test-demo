export type ServiceError = { kind: "unavailable" | "invalid-input" | "not-found"; message: string; retryable?: boolean };
