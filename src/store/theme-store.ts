import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeControlsState {
  theme: Theme;
  volume: boolean;
  toggleTheme: () => void;
  toggleVolume: () => void;
}

export const themeControls = create<ThemeControlsState>()(
  persist(
    (set) => ({
      theme: "dark",
      volume: true,

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),

      toggleVolume: () =>
        set((state) => ({
          volume: !state.volume,
        })),
    }),
    {
      name: "theme-controls-storage", // localStorage key
    }
  )
);