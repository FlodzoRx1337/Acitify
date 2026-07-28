"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import useSubscribeModal, {
  SubscribeModalStore,
} from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";

function AccountContent(): React.ReactElement {
  const router: AppRouterInstance = useRouter();
  const subscribeModal: SubscribeModalStore = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect((): void => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal: () => Promise<void> =
    async (): Promise<void> => {
      setLoading(true);
      try {
        const { url } = await postData({
          url: "/api/create-portal-link",
        });
        window.location.assign(url);
      } catch (error) {
        if (error) {
          toast.error((error as Error).message);
        }
      }
      setLoading(false);
    };

  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No active plan.</p>
          <Button
            onClick={subscribeModal.onOpen}
            className="w-[300px]"
          >
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the
            <b> {subscription?.prices?.products?.name} </b>
            plan.
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
}

export default AccountContent;
