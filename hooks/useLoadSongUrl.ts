import {
  SupabaseClient,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

import { Song } from "@/types";

function useLoadSongUrl(song: Song): string {
  const supabaseClient: SupabaseClient<any, "public", any> =
    useSupabaseClient();

  if (!song) {
    return "";
  }

  const { data: songData } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
}

export default useLoadSongUrl;
