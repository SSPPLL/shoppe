import { create } from 'zustand';

export interface ISearchStore {
	value: string;
	setValue: (value: string) => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
	value: '',
	setValue: (value: string) => set({ value }),
}))

export const setSearchValue = useSearchStore.getState().setValue;