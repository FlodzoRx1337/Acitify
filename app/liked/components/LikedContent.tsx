"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
  songs: Song[];
}

function LikedContent({ songs }: LikedContentProps): React.ReactElement {
  const router: AppRouterInstance = useRouter();
  const { isLoading, user } = useUser();

  const onPlay: (id: string) => void = useOnPlay(songs);

  useEffect((): void => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full px-6 
          text-neutral-400
        "
      >
        No liked songs.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map(
        (song: any): React.ReactElement => (
          <div
            key={song.id}
            className="flex items-center gap-x-4 w-full"
          >
            <div className="flex-1">
              <MediaItem
                onClick={(id: string): void => {
                  onPlay(id);
                }}
                data={song}
              />
            </div>
            <LikeButton songId={song.id} />
          </div>
        )
      )}
    </div>
  );
}

export default LikedContent;
