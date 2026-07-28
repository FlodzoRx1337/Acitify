import { Song } from "@/types";

import useAuthModal, { AuthModalStore } from "./useAuthModal";
import usePlayer, { PlayerStore } from "./usePlayer";
import useSubscribeModal, { SubscribeModalStore } from "./useSubscribeModal";
import { useUser } from "./useUser";

function useOnPlay(songs: Song[]): (id: string) => void {
  const player: PlayerStore = usePlayer();
  const subscribeModal: SubscribeModalStore = useSubscribeModal();
  const authModal: AuthModalStore = useAuthModal();
  const { subscription, user } = useUser();

  const onPlay: (id: string) => void = (id: string): void => {
    if (!user) {
      return authModal.onOpen();
    }

    // ===== ВРЕМЕННО ОТКЛЮЧАЕМ ПРОВЕРКУ НА ПРЕМИУМ =====
    // if (!subscription) {
    //   return subscribeModal.onOpen();
    // }
    // ===== КОНЕЦ ВРЕМЕННОГО ОТКЛЮЧЕНИЯ =====

    player.setId(id);
    player.setIds(songs.map((song: Song): string => song.id));
  };

  return onPlay;
}

export default useOnPlay;
