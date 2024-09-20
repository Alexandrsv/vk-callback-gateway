import { type NextRequest } from "next/server";
import { CallbackEvent } from "@/types/types";
import { cbConfirmationKeys, tableId } from "@/config";
import { addRowToTable } from "@/externalApi/nocodb";
import { faker } from "@/lib/faker";
import { getVkUserInfo } from "@/externalApi/vk";
import { sexDictionary } from "@/constants";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CallbackEvent;
  console.log(JSON.stringify(body, null, 2));

  if (body.type === "confirmation") {
    return new Response(
      cbConfirmationKeys[body.group_id as keyof typeof cbConfirmationKeys]
    );
  }

  if (body.type === "group_leave") {
    return new Response("ok");
  }

  if (body.type === "group_join") {
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
    return new Response("ok");
  }

  return new Response("ok");
}

export async function GET(_request: NextRequest) {
  // const response = await getBases();
  // const response = await addRowToTable(tableId, {
  //   name: "test",
  //   value: "test",
  // });
  const response = await addRowToTable(tableId, {
    Статус: "Новичок",
    Пол: "Не указан",
    "Ссылка на профиль":
      "https://vk.com/id" + Math.floor(Math.random() * 10000),
    Имя: faker.person.fullName(),
    Id: Math.floor(Math.random() * 10000),
  });
  console.log(JSON.stringify(response, null, 2));
  return new Response(JSON.stringify(response, null, 2));
}
