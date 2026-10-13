import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INGREDIENTS, SavedVideoSchema, VideoSchema, type SavedVideo, type Video } from "./data";

export type SavedFilter = "all" | "shorts" | "long";

export const CURRENT_MONTH = new Date().getMonth() + 1;

type Store = {
  selectedMonth: number;
  savedVideos: SavedVideo[]; // most recently saved first
  savedFilter: SavedFilter;
  player: Video | null;
  toast: { video: SavedVideo; index: number } | null; // last unsaved, for undo
  setMonth: (month: number) => void;
  setFilter: (filter: SavedFilter) => void;
  openPlayer: (video: Video) => void;
  closePlayer: () => void;
  toggleSave: (video: Video) => void;
  undoUnsave: () => void;
  hideToast: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      selectedMonth: CURRENT_MONTH,
      savedVideos: [],
      savedFilter: "all",
      player: null,
      toast: null,
      setMonth: (selectedMonth) => set({ selectedMonth }),
      setFilter: (savedFilter) => set({ savedFilter }),
      openPlayer: (player) => set({ player }),
      closePlayer: () => set({ player: null }),
      toggleSave: (video) => {
        const list = get().savedVideos;
        const index = list.findIndex((s) => s.id === video.id);
        if (index >= 0) {
          set({ savedVideos: list.toSpliced(index, 1), toast: { video: list[index], index } });
          return;
        }
        const saved = {
          ...VideoSchema.parse(video), // strips SavedVideo extras when re-saving
          ingredientName: INGREDIENTS[video.ingredientId]?.name ?? "",
          savedAt: Date.now(),
        };
        set({ savedVideos: [saved, ...list] });
      },
      undoUnsave: () => {
        const t = get().toast;
        if (!t) return;
        set({ savedVideos: get().savedVideos.toSpliced(t.index, 0, t.video), toast: null });
      },
      hideToast: () => set({ toast: null }),
    }),
    {
      name: "jecheol-bapsang",
      partialize: (s) => ({ savedVideos: s.savedVideos }),
      // localStorage is untrusted: drop anything that doesn't match the schema
      merge: (persisted, current) => ({
        ...current,
        savedVideos: SavedVideoSchema.array()
          .catch([])
          .parse((persisted as { savedVideos?: unknown } | undefined)?.savedVideos),
      }),
      skipHydration: true, // rehydrated on mount to avoid SSR mismatch
    },
  ),
);

export const useIsSaved = (id: string) => useStore((s) => s.savedVideos.some((v) => v.id === id));
