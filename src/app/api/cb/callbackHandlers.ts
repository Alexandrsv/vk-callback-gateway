import { NextResponse } from "next/server";
import { CallbackEvent, GroupJoinEvent } from "@/types/types";
import { cbConfirmationKeys, tableId } from "@/config";
import {
  addRowToTable,
  getTableRowById,
  updateTableRow,
  uploadAvatarByUrl,
} from "@/externalApi/nocodb";
import { getVkUserInfo } from "@/externalApi/vk";
import { groupDictionary, sexDictionary, TGroupId } from "@/constants";
import { UpdateTableRowData } from "@/types/nocodb.types";

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

  const user = vkResponse[0];
  const sex = sexDictionary[user.sex];
  const uid = body.object.user_id.toString();

  const userRow = await getTableRowById(tableId, uid);

  if (!userRow) {
    const attachment = await uploadAvatarByUrl(uid, user.photo_400);

    await addRowToTable(tableId, {
      Статус: "Новичок",
      Пол: sex,
      "Ссылка на профиль": "https://vk.com/" + user.domain,
      Attachment: attachment,
      Имя: user.first_name + " " + user.last_name,
      Id: user.id,
    });

    return handleOkResponse();
  }

  const publics = Array.from(
    new Set((userRow.Сообщества || "").split(",")).add(
      groupDictionary[body.group_id as TGroupId],
    ),
  )
    .filter(Boolean)
    .join(",");

  const newFields: UpdateTableRowData = {
    Id: +uid,
    Сообщества: publics,
  };

  await updateTableRow(tableId, uid, newFields);

  return handleOkResponse();
};

export const handleOkResponse = () => {
  return new NextResponse("ok");
};
