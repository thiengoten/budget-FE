import { CallBack } from '@/types/commonType'
import { create } from 'zustand'

type SidebarState = {
  isOpen: boolean
  setIsOpen: CallBack
}

export const useSidebarToggle = create<SidebarState>((set, get) => ({
  isOpen: true,
  setIsOpen: () => set({ isOpen: !get().isOpen }),
}))
