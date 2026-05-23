import type { Pokemon } from "@/types/pokemon"
import { create } from "zustand";

interface ComparadorStore {
    slots: [Pokemon | null, Pokemon | null];
    add: (pokemon: Pokemon) => void;
    remove: (id: number) => void;
    clear: () => void;
    isSelected: (id: number) => boolean;
}

export const useComparadorStore = create<ComparadorStore>((set, get) => ({
    slots: [null, null],

    add: (pokemon) => {
        const {slots} = get();
        if (slots.some((s) => s?.id === pokemon.id)) return;

        if(!slots[0]) {
            set({ slots: [pokemon, slots[1]] });
            return;
        }

        if (!slots[1]) {
            set({ slots: [slots[0], pokemon] });
            return;
        }

        set({ slots: [slots[0], pokemon]});
    },

    remove: (id) => set((state) => ({
        slots: state.slots.map((s) => s?.id === id ? null : s) as [Pokemon | null, Pokemon | null]
    })),

    clear: () => set({ slots: [null, null] }),

    isSelected: (id) => get().slots.some((s) => s?.id === id)
}))