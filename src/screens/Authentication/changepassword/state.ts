import { create } from 'zustand'

interface BearState {
    stage: number
    email: string
    setEmail: (email:string) => void
    increase: (by: number) => void
    decrease: () => void
    setStage: (by: number) => void
    resetStage: () => void
  }
  
 export const useStageStore = create<BearState>()((set) => ({
    stage: 1,
    email: '',
    setEmail: (email: string) => set((state) => ({...state, email })),
    increase: (by) => set((state) => ({ stage: state.stage + by })),
    decrease: () => (set((state) => ({ stage: state.stage - 1}))),
    setStage: (by) => (set((state) => ({ stage: state.stage - 1}))),
    resetStage: () => set((state) => ({ ...state, stage: 1 }))
  }))
