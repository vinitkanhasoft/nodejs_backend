export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export const paginate = <T>(
  items: T[],
  page: number = 1,
  limit: number = 10
): PaginationResult<T> => {
  const offset = (page - 1) * limit;
  const paginatedItems = items.slice(offset, offset + limit);
  return {
    data: paginatedItems,
    total: items.length,
    page,
    limit,
  };
};