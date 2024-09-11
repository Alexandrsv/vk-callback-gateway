export interface TableRowsData {
  list: TableRow[];
  pageInfo: PageInfo;
}

export type TableRowStatus =
  | "Новичок"
  | "Договорились о созвоне"
  | "Созвон завершен"
  | "Отказ";

export interface TableRow {
  Id: number;
  Имя?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  Ссылка_на_профиль?: string;
  Статус: TableRowStatus;
}

export interface PageInfo {
  totalRows: number;
  page: number;
  pageSize: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}
