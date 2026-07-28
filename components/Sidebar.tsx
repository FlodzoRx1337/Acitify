"use client";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

import { Song } from "@/types";
import usePlayer, { PlayerStore } from "@/hooks/usePlayer";

import SidebarItem, { SidebarItemProps } from "./SidebarItem";
import Box from "./Box";
import Library from "./Library";
import { useMemo } from "react";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

function Sidebar({ children, songs }: SidebarProps): React.ReactElement {
  const pathname: string = usePathname();
  const player: PlayerStore = usePlayer();

  const routes: SidebarItemProps[] = useMemo(
    (): SidebarItemProps[] => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div
      className={twMerge(
        `
          flex 
          h-full
        `,
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map(
              (item: SidebarItemProps): React.ReactElement => (
                <SidebarItem
                  key={item.label}
                  {...item}
                />
              )
            )}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
}

export default Sidebar;
