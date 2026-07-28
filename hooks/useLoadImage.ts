import {
  SupabaseClient,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

import { Song } from "@/types";

function useLoadImage(song: Song): string | null {
  const supabaseClient: SupabaseClient<any, "public", any> =
    useSupabaseClient();

  if (!song) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
}

export default useLoadImage;
