import {
  SupabaseClient,
  createMiddlewareClient,
} from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(
  req: NextRequest
): Promise<NextResponse<unknown>> {
  const res: NextResponse<unknown> = NextResponse.next();
  const supabase: SupabaseClient<any, "public", any> = createMiddlewareClient({
    req,
    res,
  });
  await supabase.auth.getSession();
  return res;
}
