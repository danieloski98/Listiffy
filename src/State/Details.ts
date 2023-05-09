import { create } from 'zustand'
import { UserModel } from '../models/User.Model';

interface State {
    setState: (data: Partial<UserModel>) => void;
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
    phone: '',
    state: '',
    country: '',
    token: '',
    createAt: '',
    updatedAt: '',
    isCompanyVerified: false,
    following: [],
    setState: (data: Partial<UserModel>) => set((state) => ({ ...state, ...data })),
}));