import { Manga } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MangaStore {
  mangas: Manga[]
  setMangas: (mangas: Manga[]) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const useMangaStore = create<MangaStore>()(persist((set) => ({
  mangas: [],
  setMangas: (mangas) => set({ mangas }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading })
}), {
  name: 'manga-store'
}))
