import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token");
  console.log(JSON.stringify(request, null, 2));
  return new Response(JSON.stringify({ token: 123 }));
}
