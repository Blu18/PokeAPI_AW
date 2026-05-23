import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritoStore {
  favoritos: Record<number, boolean>;
  toggle: (id: number) => void;
  isFavorito: (id: number) => boolean;
}

export const useFavoritosStore = create<FavoritoStore>()(
  persist(
    (set, get) => ({
      favoritos: {},

      toggle: (id) =>
        set((state) => {
          const actualizado = { ...state.favoritos };
          if (actualizado[id]) {
            delete actualizado[id];
          } else {
            actualizado[id] = true;
          }
          return { favoritos: actualizado };
        }),

      isFavorito: (id) => !!get().favoritos[id],
    }),
    {
      name: "pokedex_favoritos",
      storage: createJSONStorage(() => localStorage),
    }
  )
);