import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AccountSetupState {
    stage: number;
    fullname: string;
    pickerModal: boolean
    avatarModal: boolean
    avatar: string
    businesses: Array<string>
    interests: Array<string>
    file: IFile
    setStage: (stage: number) => void;
    setFullname: (name: string) => void;
    setPickerModal: (opt: boolean) => void;
    setAvatarModal: (opt: boolean) => void;
    setAvatar: (avt: string) => void
    addBusiness: (business: string) => void
    addInterest: (interest: string) => void
    setFile: (data: any) => void
}

export interface IFile {
    mimeType: string,
    name: string,
    size: number,
    type?: string,
    uri: string
}

export const useAccountSetupState = create<AccountSetupState>()(
    (set) => ({
        stage: 0,
        setStage: (stage) => set((state) => ({ ...state, stage })),
        fullname: '',
        avatar: '',
        pickerModal: false,
        avatarModal: false,
        businesses: [],
        interests: [],
        file: {
            mimeType: '',
            name: '',
            size: 0,
            type: '',
            uri: ''
        },
        setFullname: (name: string) => set((state) => ({ ...state, fullname: name })),
        setPickerModal: (opt: boolean) => set((state) => ({ ...state, pickerModal: opt })),
        setAvatarModal: (opt: boolean) => set((state) => ({ ...state, avatarModal: opt })),
        setAvatar: (vat: string) => set((state) => ({ ...state, avatar: vat })),
        addBusiness: (id: string) => set((state) => ({ ...state, businesses: [...state.businesses, id] })),
        addInterest: (id: string) => set((state) => ({ ...state, interests: [...state.interests, id] })),
        setFile: (data: any) => set((state) => ({ ...state, file: data}))
    })
)