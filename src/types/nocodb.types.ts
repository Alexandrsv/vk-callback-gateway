import { sexDictionary } from "@/constants";

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
  Пол: (typeof sexDictionary)[keyof typeof sexDictionary];
  Сообщества?: string;
  "Ссылка на профиль"?: string;
  Статус: TableRowStatus;
  Attachment?: AttachmentByUrlResponse[];
  CreatedAt?: string;
  UpdatedAt?: string;
}

export type UpdateTableRowData = {
  Id: number;
} & Partial<TableRow>;

export interface PageInfo {
  totalRows: number;
  page: number;
  pageSize: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export interface AttachmentByUrlResponse {
  path: string;
  title: string;
  mimetype: string;
  size: number;
  width: number;
  height: number;
  signedPath: string;
}
