import { create, createStore } from 'zustand'

interface ICounter {
    count: number;
    increment: (count: number) => void;
    decrement: () => void;
}

export const useCounter = create<ICounter>((set, get) => ({
    count: 0,
    increment: (count) => set((state) => ({ count: state.count + count }) ),
    decrement: () => set((state) => ({ count: state.count -+ 1 }) )
}));
