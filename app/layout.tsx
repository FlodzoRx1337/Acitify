import { NextFont } from "next/dist/compiled/@next/font";
import { Figtree } from "next/font/google";

import getSongsByUserId from "@/actions/getSongsByUserId";
import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import UserProvider from "@/providers/UserProvider";

import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import Player from "@/components/Player";
import { ProductWithPrice, Song } from "@/types";
import "./globals.css";

const font: NextFont = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export const revalidate = 0;

async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactElement> {
  const userSongs: Song[] = await getSongsByUserId();
  const products: ProductWithPrice[] = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}

export default RootLayout;
