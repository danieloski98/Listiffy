import { create } from 'zustand'

interface EditBasic {
    pickerModal: boolean
    avatarModal: boolean
    avatar: string
    file: IFile
    avatarUploading: boolean
    showToast: boolean;
    message: string
    setStage: (stage: number) => void;
    setPickerModal: (opt: boolean) => void;
    setAvatarModal: (opt: boolean) => void;
    setAvatar: (avt: string) => void
    setFile: (data: any) => void
    setAvatarUploading: (opt: boolean) => void
    setShowTaost: (opt: boolean) => void
    setMessage: (opt: string) => void
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
        avatarUploading: false,
        stage: 0,
        setStage: (stage) => set((state) => ({ ...state, stage })),
        avatar: '',
        pickerModal: false,
        avatarModal: false,
        showToast: false,
        message: '',
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
        setFile: (data: any) => set((state) => ({ ...state, file: data})),
        setAvatarUploading: (opt: boolean) => set((state) => ({ ...state, avatarUploading: opt })),
        setShowTaost: (opt: boolean) => set((state) => ({ ...state, showToast: opt })),
        setMessage: (opt: string) => set((state) => ({ ...state, message: opt })),
    })
)