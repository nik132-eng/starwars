import { create } from 'zustand'

interface StoreState {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

const useStore = create<StoreState>((set) => ({
  selectedCategory: 'vehicles',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}))

export default useStore