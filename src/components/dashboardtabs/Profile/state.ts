import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ProfileState {
    showPinModal: boolean;
    setShowPinModal: (opt: boolean) => void
}


export const useBusinessState = create<ProfileState>()(
    (set) => ({
        showPinModal: false,
        setShowPinModal:  (opt: boolean) => set((state) => ({ showPinModal: opt }) ),
    })
)