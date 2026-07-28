"use client";

import useSound from "use-sound";
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import usePlayer, { PlayerStore } from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import { IconType } from "react-icons";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

function PlayerContent({
  song,
  songUrl,
}: PlayerContentProps): React.ReactElement {
  const player: PlayerStore = usePlayer();
  const [volume, setVolume] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const Icon: IconType = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon: IconType = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext: () => void = (): void => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex: number = player.ids.findIndex(
      (id: string): boolean => id === player.activeId
    );
    const nextSong: string = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious: () => void = (): void => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex: number = player.ids.findIndex(
      (id: string): boolean => id === player.activeId
    );
    const previousSong: string = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: (): void => setIsPlaying(true),
    onend: (): void => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: (): void => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect((): (() => void) => {
    sound?.play();

    return (): void => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay: () => void = (): void => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute: () => void = (): void => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div
        className="
          flex 
          md:hidden 
          col-auto 
          w-full 
          justify-end 
          items-center
        "
      >
        <div
          onClick={handlePlay}
          className="
            flex 
            items-center 
            justify-center
            h-10
            w-10 
            rounded-full 
            bg-white 
            p-1 
            cursor-pointer
          "
        >
          <Icon
            size={30}
            className="text-black"
          />
        </div>
      </div>

      <div
        className="
          hidden
          h-full
          md:flex 
          justify-center 
          items-center 
          w-full 
          max-w-[722px] 
          gap-x-6
        "
      >
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="
            flex 
            items-center 
            justify-center
            h-10
            w-10 
            rounded-full 
            bg-white 
            p-1 
            cursor-pointer
          "
        >
          <Icon
            size={30}
            className="text-black"
          />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider
            value={volume}
            onChange={(value: number): void => setVolume(value)}
          />
        </div>
      </div>
    </div>
  );
}

export default PlayerContent;
