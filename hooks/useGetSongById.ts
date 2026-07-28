import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

function useGetSongById(id?: string): {
  isLoading: boolean;
  song: Song | undefined;
} {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect((): void => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong: () => Promise<void> = async (): Promise<void> => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        toast.error(error.message);
        return;
      }

      setSong(data as Song);
      setIsLoading(false);
    };

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(
    (): { isLoading: boolean; song: Song | undefined } => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
}

export default useGetSongById;
