"use client";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FaUserAlt } from "react-icons/fa";
import {
  SupabaseClient,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import toast from "react-hot-toast";

import useAuthModal, { AuthModalStore } from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

import Button from "./Button";
import usePlayer, { PlayerStore } from "@/hooks/usePlayer";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

function Header({ children, className }: HeaderProps): React.ReactElement {
  const player: PlayerStore = usePlayer();
  const authModal: AuthModalStore = useAuthModal();
  const router: AppRouterInstance = useRouter();

  const supabaseClient: SupabaseClient<any, "public", any> =
    useSupabaseClient();
  const { user } = useUser();

  const handleLogout: () => void = async (): Promise<void> => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={(): void => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft
              className="text-white"
              size={35}
            />
          </button>
          <button
            onClick={(): void => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight
              className="text-white"
              size={35}
            />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={(): void => router.push("/")}
            className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            <HiHome
              className="text-black"
              size={20}
            />
          </button>
          <button
            onClick={(): void => router.push("/search")}
            className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            <BiSearch
              className="text-black"
              size={20}
            />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={handleLogout}
                className="bg-white px-6 py-2"
              >
                Logout
              </Button>
              <Button
                onClick={(): void => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="
                    bg-transparent 
                    text-neutral-300 
                    font-medium
                  "
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-white px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Header;
