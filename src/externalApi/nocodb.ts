import { Api } from "nocodb-sdk";
import { TableRow, TableRowsData } from "@/types/nocodb.types";

const ncdb = new Api({
  baseURL: "https://ncdb.zbc.su:443",
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

export const getTableRowById = async (tableId: string, id: number) => {
  return (await ncdb.dbDataTableRow.list(tableId, {
    where: "()",
  })) as TableRowsData;
};
