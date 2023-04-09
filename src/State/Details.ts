import { create } from 'zustand'
import { UserModel } from '../models/User.Model';

interface State {
    setState: (data: Partial<State>) => void;
}

export const useDetails = create<UserModel & State>()((set) => ({
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
    token: '',
    createAt: '',
    updatedAt: '',
    isCompanyVerified: false,
    setState: (data: Partial<State>) => set((state) => ({ ...state, ...data })),
}));