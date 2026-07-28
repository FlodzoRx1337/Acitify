import { Song } from "@/types";
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import getSongs from "./getSong";

async function getSongsByTitle(title: string): Promise<Song[]> {
  const supabase: SupabaseClient<any, "public", any> =
    createServerComponentClient({
      cookies: cookies,
    });

  if (!title) {
    const allSongs: Song[] = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return (data as Song[]) || [];
}

export default getSongsByTitle;
