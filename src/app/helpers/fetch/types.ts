export interface PaginatedRecords<T> {
  page: number;
  pages: number;
  records: T[];
}
