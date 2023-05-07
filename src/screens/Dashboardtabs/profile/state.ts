import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ProfileState {
    showModal: boolean;
    showPinModal: boolean;
    isBusiness: boolean;
    setShowPinModal: (opt: boolean) => void;
    setShowModal: (opt: boolean) => void
    setBusiness: (opt: boolean) => void;
}


export const useProfileState = create<ProfileState>()(
    (set) => ({
        showModal: false,
        showPinModal: false,
        isBusiness: false,
        setShowModal:  (opt: boolean) => set((state) => ({ ...state, showModal: opt }) ),
        setShowPinModal:  (opt: boolean) => set((state) => ({ ...state, showPinModal: opt }) ),
        setBusiness:  (opt: boolean) => set((state) => ({ ...state, isBusiness: opt }) ),
    })
)