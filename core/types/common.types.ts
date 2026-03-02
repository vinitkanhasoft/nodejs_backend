export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export interface Pagination {
  page?: number;
  limit?: number;
}
