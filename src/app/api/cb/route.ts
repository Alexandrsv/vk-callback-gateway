import { type NextRequest } from "next/server";
import { tableId } from "@/config";
import { addRowToTable } from "@/externalApi/nocodb";
import { faker } from "@/lib/faker";
import { processCallback } from "@/app/api/cb/callbackProcessor";

export async function POST(request: NextRequest) {
  return processCallback(request);
}

export async function GET(_request: NextRequest) {
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
