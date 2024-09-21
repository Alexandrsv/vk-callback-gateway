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
  CreatedAt?: string;
  UpdatedAt?: string;
  Attachment?: AttachmentByUrlResponse[];
  "Ссылка на профиль"?: string;
  Статус: TableRowStatus;
}

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
