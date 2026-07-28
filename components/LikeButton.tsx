"use client";

import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";
import useAuthModal, { AuthModalStore } from "@/hooks/useAuthModal";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { IconType } from "react-icons";

interface LikeButtonProps {
  songId: string;
}

function LikeButton({ songId }: LikeButtonProps): React.ReactElement {
  const router: AppRouterInstance = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal: AuthModalStore = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect((): void => {
    if (!user?.id) {
      return;
    }

    const fetchData: () => Promise<void> = async (): Promise<void> => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon: IconType = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike: () => Promise<void> = async (): Promise<void> => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Success");
      }
    }

    router.refresh();
  };

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleLike}
    >
      <Icon
        color={isLiked ? "#22c55e" : "white"}
        size={25}
      />
    </button>
  );
}

export default LikeButton;
