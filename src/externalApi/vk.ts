import { VK } from "vk-io";

const ACCESS_TOKEN = process.env.VK_APP_TOKEN || "";

const vk = new VK({
  token: ACCESS_TOKEN,
});

export const getVkUserInfo = async (userIds: number[]) => {
  const response = await vk.api.users.get({
    user_ids: userIds,
    fields: ["photo_400", "city", "sex", "domain"],
    lang: "ru",
  });
  return response;
};
