import {
  User,
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import {
  PostgrestBuilder,
  PostgrestSingleResponse,
} from "@supabase/postgrest-js";
import { Context, createContext, useContext, useEffect, useState } from "react";

import { Subscription, UserDetails } from "@/types";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext: Context<UserContextType | undefined> = createContext<
  UserContextType | undefined
>(undefined);

export interface Props {
  [propName: string]: any;
}

export function MyUserContextProvider(props: Props): React.ReactElement {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user: User | null = useSupaUser();
  const accessToken: string | null = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails: () => PostgrestBuilder<any> =
    (): PostgrestBuilder<any> => supabase.from("users").select("*").single();
  const getSubscription: () => PostgrestBuilder<any> =
    (): PostgrestBuilder<any> =>
      supabase
        .from("subscriptions")
        .select("*, prices(*, products(*))")
        .in("status", ["trialing", "active"])
        .single();

  useEffect((): void => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (
          results: [
            PromiseSettledResult<PostgrestSingleResponse<any>>,
            PromiseSettledResult<PostgrestSingleResponse<any>>
          ]
        ): void => {
          const userDetailsPromise: PromiseSettledResult<
            PostgrestSingleResponse<any>
          > = results[0];
          const subscriptionPromise: PromiseSettledResult<
            PostgrestSingleResponse<any>
          > = results[1];

          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }

          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }

          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return (
    <UserContext.Provider
      value={value}
      {...props}
    />
  );
}

export function useUser(): UserContextType {
  const context: UserContextType | undefined = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
}
