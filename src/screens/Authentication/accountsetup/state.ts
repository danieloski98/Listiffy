import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AccountSetupState {
    stage: number;
    setStage: (stage: number) => void;
}

export const useAccountSetupState = create<AccountSetupState>()(
    persist(
        (set) => ({
            stage: 1,
            setStage: (stage) => set((state) => ({ ...state, stage })),
        }),
        {
            name: 'account-setup'
        }
    )
)