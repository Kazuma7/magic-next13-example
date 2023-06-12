import { Magic } from "@magic-sdk/admin";
import { NextResponse } from "next/server";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const headersList: any = request.headers.get("authorization");
    const didToken = headersList.substr(7);
    await magic.token.validate(didToken);
    return NextResponse.json({
      authenticated: true,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
