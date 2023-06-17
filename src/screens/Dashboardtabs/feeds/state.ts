import { create } from 'zustand'

interface State {
    showPost: boolean;
    showComment: boolean;
    activePostId: string;
    bookmarks: string[];
    state: string;
    setAll: (value: Partial<State>) => void
}

export const useFeedsState = create<State>()(
    (set) => ({
        showPost: false,
        showComment: false,
        activePostId: '',
        bookmarks: [],
        state: 'All',
        setAll: (val) => set(state => ({ ...state, ...val })),
    })
)