export interface DomainEvent<TPayload = unknown> {
  type: string;
  payload: TPayload;
  occurredAt: Date;
}