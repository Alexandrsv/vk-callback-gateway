import { NextRequest, NextResponse } from "next/server";
import {
  handleConfirmation,
  handleOkResponse,
  handleGroupJoin,
} from "./callbackHandlers";

export async function processCallback(
  request: NextRequest,
): Promise<NextResponse> {
  const body = await request.json();

  switch (body.type) {
    case "confirmation":
      return handleConfirmation(body);
    case "group_leave":
      return handleOkResponse();
    case "group_join":
      return handleGroupJoin(body);
    default:
      return handleOkResponse();
  }
}
