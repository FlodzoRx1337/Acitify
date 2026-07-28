import { StoreApi, UseBoundStore, create } from "zustand";

export interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer: UseBoundStore<StoreApi<PlayerStore>> = create<PlayerStore>(
  (
    set: (
      partial:
        | PlayerStore
        | Partial<PlayerStore>
        | ((state: PlayerStore) => PlayerStore | Partial<PlayerStore>),
      replace?: boolean | undefined
    ) => void
  ): PlayerStore => ({
    ids: [],
    activeId: undefined,
    setId: (id: string): void => set({ activeId: id }),
    setIds: (ids: string[]): void => set({ ids }),
    reset: (): void => set({ ids: [], activeId: undefined }),
  })
);

export default usePlayer;
