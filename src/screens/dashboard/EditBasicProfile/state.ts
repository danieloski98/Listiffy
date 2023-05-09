import { create } from 'zustand'

interface EditBasic {
    
    pickerModal: boolean
    avatarModal: boolean
    avatar: string
    file: IFile
    setStage: (stage: number) => void;
    setPickerModal: (opt: boolean) => void;
    setAvatarModal: (opt: boolean) => void;
    setAvatar: (avt: string) => void
    setFile: (data: any) => void
}

export interface IFile {
    mimeType: string,
    name: string,
    size: number,
    type?: string,
    uri: string
}

export const useEditBasicState = create<EditBasic>()(
    (set) => ({
        stage: 0,
        setStage: (stage) => set((state) => ({ ...state, stage })),
        avatar: '',
        pickerModal: false,
        avatarModal: false,
        file: {
            mimeType: '',
            name: '',
            size: 0,
            type: '',
            uri: ''
        },
        setPickerModal: (opt: boolean) => set((state) => ({ ...state, pickerModal: opt })),
        setAvatarModal: (opt: boolean) => set((state) => ({ ...state, avatarModal: opt })),
        setAvatar: (vat: string) => set((state) => ({ ...state, avatar: vat })),
        setFile: (data: any) => set((state) => ({ ...state, file: data}))
    })
)