import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { IFile } from '../../../Authentication/accountsetup/state';


interface State {
    stage: number;
    idx: number;
    docType: string;
    docNumber: string;
    front: IFile;
    back: IFile;
    // setter
    setDocType: (docType: string) => void;
    setDocNumber: (docNumber: string) => void;
    setStage: (stage: number) => void;
    setFront: (file: IFile) => void;
    setBack: (file: IFile) => void;
    setIdx: (stage: number) => void;
    setAll: (data: any) => void;
}


export const useDocState = create<State>()(
    (set) => ({
        idx: 0,
        docNumber: '',
        docType: '',
        stage: 0,
        front: {
            mimeType: '',
            name: '',
            size: 0,
            type: '',
            uri: ''
        },
        back: {
            mimeType: '',
            name: '',
            size: 0,
            type: '',
            uri: ''
        },
        setDocType: (docType: string) => set((state) => ({ ...state, docType })),
        setDocNumber: (docNumber: string) => set((state) => ({ ...state, docNumber })),
        setStage: (stage: number) => set((state) => ({ ...state, stage })),
        setFront: (front: IFile) => set((state) => ({ ...state, front })),
        setBack: (back: IFile) => set((state) => ({ ...state, back })),
        setAll: (data: any) => set(() => ({ ...data })),
        setIdx: (idx: number) => set((state) => ({ ...state, idx })),
    })
    );
    
    
