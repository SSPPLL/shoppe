import { create } from 'zustand';

export interface IToast {
	message: string;
	delay?: number
}

export interface IToastItem extends IToast {
	id: number;
	delay: number
}

export interface IToastsStore {
	toasts: IToastItem[];
	addToast: (toast: IToast) => void;
	removeToast: (id: number) => void;
}

export const useToastsStore = create<IToastsStore>((set) => ({
	toasts: [],
	addToast: (toast: IToast) => set((state) => ({
		toasts: [...state.toasts, {
			delay: 3000,
			id: Date.now(),
			...toast
		}]
	})),
	removeToast: (id: number) => set((state) => ({ toasts: state.toasts.filter((toast: IToastItem) => toast.id !== id) }))
}))

export const useToasts = () => useToastsStore((state) => state.toasts);
export const addToast = useToastsStore.getState().addToast;
export const removeToast = useToastsStore.getState().removeToast;