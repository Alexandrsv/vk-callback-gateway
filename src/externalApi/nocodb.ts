import { Api } from "nocodb-sdk";
import {
  AttachmentByUrlResponse,
  TableRow,
  TableRowsData,
  UpdateTableRowData,
} from "@/types/nocodb.types";

const ncdb = new Api({
  baseURL: "https://ncdb.zbc.su",
  headers: {
    "xc-token": process.env.NOCODB_TOKEN,
  },
});

export const getBases = async () => {
  return await ncdb.base.list();
};

export const addRowToTable = async (
  tableId: string,
  row: TableRow | TableRow[],
) => {
  return await ncdb.dbDataTableRow.create(tableId, row);
};

export const updateTableRow = async (
  tableId: string,
  uid: string,
  row: UpdateTableRowData | UpdateTableRowData[],
) => {
  return await ncdb.dbDataTableRow.update(tableId, row);
};

export const getTableRows = async (tableId: string) => {
  return (await ncdb.dbDataTableRow.list(tableId)) as TableRowsData;
};

export const getTableRowById = async (tableId: string, uid: string) => {
  return (await ncdb.dbDataTableRow
    .read(tableId, uid)
    .catch(() => null)) as TableRow | null;
};

export const getTableRowsById = async (tableId: string, uid: string) => {
  return (await ncdb.dbDataTableRow.list(tableId, {
    where: `(Id,eq,${uid})`,
  })) as TableRowsData;
};

export const uploadAvatarByUrl = async (
  uid: string | number,
  imgUrl: string,
) => {
  return (await ncdb.storage.uploadByUrl({ path: "avatars" }, [
    {
      url: imgUrl,
      fileName: `ava_${uid}.jpg`,
    },
  ])) as AttachmentByUrlResponse[];
};
