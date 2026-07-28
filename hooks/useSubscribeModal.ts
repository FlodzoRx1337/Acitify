import { StoreApi, UseBoundStore, create } from "zustand";

export interface SubscribeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSubscribeModal: UseBoundStore<StoreApi<SubscribeModalStore>> =
  create<SubscribeModalStore>(
    (set: any): { isOpen: false; onOpen: () => void; onClose: () => void } => ({
      isOpen: false,
      onOpen: (): void => set({ isOpen: true }),
      onClose: (): void => set({ isOpen: false }),
    })
  );

export default useSubscribeModal;
