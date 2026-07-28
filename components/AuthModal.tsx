"use client";

import {
  SupabaseClient,
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import Modal from "./Modal";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

function AuthModal(): React.ReactElement {
  const supabaseClient: SupabaseClient<any, "public", any> =
    useSupabaseClient();
  const router: AppRouterInstance = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  const onChange: (open: boolean) => void = (open: boolean): void => {
    if (!open) {
      onClose();
    }
  };

  useEffect((): void => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        magicLink
        providers={[]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22C55E",
              },
            },
          },
        }}
      />
    </Modal>
  );
}

export default AuthModal;
