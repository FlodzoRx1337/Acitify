"use client";

import usePlayer, { PlayerStore } from "@/hooks/usePlayer";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from "./PlayerContent";

function Player(): React.ReactElement | null {
  const player: PlayerStore = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl: string = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent
        key={songUrl}
        song={song}
        songUrl={songUrl}
      />
    </div>
  );
}

export default Player;
