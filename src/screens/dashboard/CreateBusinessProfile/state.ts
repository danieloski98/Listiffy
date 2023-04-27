import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type OPENING_HOUR =  {
    "day": string;
    "startHour": string;
    "endHour": string;
  }

interface State {
    stepOneDone: boolean;
    stepTwoDone: boolean;
    

    // setter
    setStepOneDone: (stepOneDone: boolean) => void;
    setStepTwoDone: (stepTwoDone: boolean) => void;

}


export const useVerfificationState = create<State>()(
    (set) => ({
        stepTwoDone: false,
        stepOneDone: false,
        setStepOneDone: (step: boolean) => set((state) => ({ ...state, stepOneDone: step })),
        setStepTwoDone: (step: boolean) => set((state) => ({ ...state, stepTwoDone: step })),
    }));
    
    
