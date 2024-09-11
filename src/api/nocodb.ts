import { Api } from "nocodb-sdk";

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
