import { type NextRequest } from "next/server";
import { CallbackEvent } from "@/types";
import { cbConfirmationKeys } from "@/config";
import { getBases } from "@/api/nocodb";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CallbackEvent;
  console.log(JSON.stringify(body, null, 2));

  if (body.type === "confirmation") {
    return new Response(
      cbConfirmationKeys[body.group_id as keyof typeof cbConfirmationKeys],
    );
  }

  if (body.type === "group_leave") {
    return new Response("ok");
  }

  if (body.type === "group_join") {
    return new Response("ok");
  }

  return new Response("ok");
}

export async function GET(request: NextRequest) {
  const response = await getBases();
  console.log(JSON.stringify(response, null, 2));
  return new Response(JSON.stringify(response, null, 2));
}
