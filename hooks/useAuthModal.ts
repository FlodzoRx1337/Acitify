import { StoreApi, UseBoundStore, create } from "zustand";

export interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAuthModal: UseBoundStore<StoreApi<AuthModalStore>> =
  create<AuthModalStore>(
    (set: any): { isOpen: false; onOpen: () => void; onClose: () => void } => ({
      isOpen: false,
      onOpen: (): void => set({ isOpen: true }),
      onClose: (): void => set({ isOpen: false }),
    })
  );

export default useAuthModal;
