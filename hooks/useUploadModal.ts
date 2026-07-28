import { StoreApi, UseBoundStore, create } from "zustand";

export interface UploadModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUploadModal: UseBoundStore<StoreApi<UploadModalStore>> =
  create<UploadModalStore>(
    (set: any): { isOpen: false; onOpen: () => void; onClose: () => void } => ({
      isOpen: false,
      onOpen: (): void => set({ isOpen: true }),
      onClose: (): void => set({ isOpen: false }),
    })
  );

export default useUploadModal;
