import { NextResponse } from "next/server";
import { CallbackEvent, GroupJoinEvent } from "@/types/types";
import { cbConfirmationKeys, tableId } from "@/config";
import {
  addRowToTable,
  getTableRowById,
  uploadAvatarByUrl,
} from "@/externalApi/nocodb";
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
  // console.log("vkResponse", JSON.stringify(vkResponse, null, 2));

  const user = vkResponse[0];
  const sex = sexDictionary[user.sex];
  const uid = body.object.user_id.toString();

  const userRow = await getTableRowById(tableId, uid);
  const attachment = await uploadAvatarByUrl(uid, user.photo_400);

  // console.log("userRow", JSON.stringify(userRow, null, 2));
  // return handleOkResponse();

  const ncdbResponse = await addRowToTable(tableId, {
    Статус: "Новичок",
    Пол: sex,
    "Ссылка на профиль": "https://vk.com/" + user.domain,
    Attachment: attachment,
    Имя: user.first_name + " " + user.last_name,
    Id: user.id,
  });

  // console.log("addRowToTable", JSON.stringify(ncdbResponse, null, 2));
  return handleOkResponse();
};

export const handleOkResponse = () => {
  return new NextResponse("ok");
};
