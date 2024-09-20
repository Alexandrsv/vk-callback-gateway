import { NextResponse } from "next/server";
import { CallbackEvent, GroupJoinEvent } from "@/types/types";
import { cbConfirmationKeys, tableId } from "@/config";
import { addRowToTable } from "@/externalApi/nocodb";
import { getVkUserInfo } from "@/externalApi/vk";
import { sexDictionary } from "@/constants";

export function handleConfirmation(body: CallbackEvent): NextResponse {
  return NextResponse.json(
    cbConfirmationKeys[body.group_id as keyof typeof cbConfirmationKeys],
  );
}

export function handleGroupLeave(): NextResponse {
  return handleOkResponse();
}

export const handleGroupJoin = async (
  body: GroupJoinEvent,
): Promise<NextResponse> => {
  const vkResponse = await getVkUserInfo([body.object.user_id]);
  console.log(JSON.stringify(vkResponse, null, 2));

  const user = vkResponse[0];
  const sex = sexDictionary[user.sex];

  const ncdbResponse = await addRowToTable(tableId, {
    Статус: "Новичок",
    Пол: sex,
    "Ссылка на профиль": "https://vk.com/" + user.domain,
    Имя: user.first_name + " " + user.last_name,
    Id: user.id,
  });

  console.log(JSON.stringify(ncdbResponse, null, 2));
  return handleOkResponse();
};

export const handleOkResponse = () => {
  return new NextResponse("ok");
};
