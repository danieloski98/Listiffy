import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type OPENING_HOUR =  {
    "day": string;
    "startHour": string;
    "endHour": string;
  }

interface State {
    step: number;
    completeionRate: number;
    setAll: (data: any) => void
}


export const useVerfificationState = create<State>()(
    (set) => ({
        step: 0,
        completeionRate: 0,
        setAll: (step: any) => set((state) => ({ ...state, ...step })),
    }));
    
    
