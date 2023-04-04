import { create } from 'zustand'

interface State {
    LGA: string;
    email: string;
    fullName: string;
    id: string;
    username: string;
    isCompany: boolean;
    isEmailVerified: boolean;
    loggedIn: boolean;
    profession: string;
    profilePicture: string;
    state: string;
    country: string;
    setState: (data: Partial<State>) => void;
}

export const useDetails = create<State>()((set) => ({
    LGA: '',
    email: '',
    fullName: '',
    id: '',
    username: '',
    isCompany: false,
    isEmailVerified: false,
    loggedIn: false,
    profession: '',
    profilePicture: '',
    state: '',
    country: '',
    setState: (data: Partial<State>) => set((state) => ({ ...state, ...data })),
}));