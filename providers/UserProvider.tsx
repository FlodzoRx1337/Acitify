"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

interface UserProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: UserProviderProps): React.ReactElement {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
}

export default UserProvider;
