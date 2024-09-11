import { Api } from "nocodb-sdk";
import { TableRow, TableRowsData } from "@/types/nocodb.types";

const api = new Api({
  baseURL: "https://ncdb.zbc.su:443",
  headers: {
    "xc-token": process.env.NOCODB_TOKEN,
  },
});

export const getBases = async () => {
  const tables = await api.base.list();
  return tables;
};

export const addRowToTable = async (
  tableId: string,
  row: TableRow | TableRow[],
) => {
  // const response = await api.dbTableRow.nestedAdd(tableId, row);
  return await api.dbDataTableRow.create(tableId, row);
};

export const getTableRows = async (tableId: string) => {
  return (await api.dbDataTableRow.list(tableId)) as TableRowsData;
};
