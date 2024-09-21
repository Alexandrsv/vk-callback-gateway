import { Api } from "nocodb-sdk";
import {
  AttachmentByUrlResponse,
  TableRow,
  TableRowsData,
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
  // const response = await api.dbTableRow.nestedAdd(tableId, row);
  return await ncdb.dbDataTableRow.create(tableId, row);
};

export const getTableRows = async (tableId: string) => {
  return (await ncdb.dbDataTableRow.list(tableId)) as TableRowsData;
};

export const getTableRowById = async (tableId: string, uid: string) => {
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
