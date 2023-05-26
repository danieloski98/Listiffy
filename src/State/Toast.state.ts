import { create } from 'zustand'

type Preset = 'success' | 'failure' | 'general' | 'offline'


interface State {
    message: string;
    showToast: boolean;
    preset: 'success' | 'failure' | 'general' | 'offline'
    setMessage: (opt: string) => void;
    setShowToast: (opt: boolean) => void
    setPreset: (opt: Preset) => void
}


export const useToast = create< State>()((set) => ({
    message: '',
    showToast: false,
    preset: 'general',
    setMessage: (opt: string) => set((state) => ({ ...state, message: opt })),
    setShowToast: (opt: boolean) => set((state) => ({ ...state, showToast: opt })),
    setPreset: (opt: Preset) => set((state) => ({ ...state, preset: opt })),
}));