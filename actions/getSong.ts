import { Song } from "@/types";
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getSongs(): Promise<Song[]> {
  const supabase: SupabaseClient<any, "public", any> =
    createServerComponentClient({
      cookies: cookies,
    });

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return (data as Song[]) || [];
}

export default getSongs;
