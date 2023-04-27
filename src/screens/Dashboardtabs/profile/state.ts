import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ProfileState {
    showModal: boolean;
    setShowModal: (opt: boolean) => void
}


export const useProfileState = create<ProfileState>()(
    (set) => ({
        showModal: false,
        setShowModal:  (opt: boolean) => set((state) => ({ showModal: opt }) ),
    })
)