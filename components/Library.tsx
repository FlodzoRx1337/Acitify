"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { Song } from "@/types";
import useUploadModal, { UploadModalStore } from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import useAuthModal, { AuthModalStore } from "@/hooks/useAuthModal";
import useSubscribeModal, {
  SubscribeModalStore,
} from "@/hooks/useSubscribeModal";

import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps {
  songs: Song[];
}
function Library({ songs }: LibraryProps): React.ReactElement {
  const { user, subscription } = useUser();
  const uploadModal: UploadModalStore = useUploadModal();
  const authModal: AuthModalStore = useAuthModal();
  const subscribeModal: SubscribeModalStore = useSubscribeModal();

  const onPlay: (id: string) => void = useOnPlay(songs);

  const onClick: () => void = (): void => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist
            className="text-neutral-400"
            size={26}
          />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map(
          (item: Song): React.ReactElement => (
            <MediaItem
              onClick={(id: string): void => {
                onPlay(id);
              }}
              key={item.id}
              data={item}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Library;
