export interface ResDtoPaginated<T> {
  page: number;
  pages: number;
  noRecordsFound?: number;
  records: T[];
}
