import { Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type TToggleAction = 'open' | 'close' | undefined;
export type TToggleStatus = 'opened' | 'opening' | 'closing' | 'closed';
export interface IUseToggle {
	status: TToggleStatus;
	isLocked: Ref<boolean>;
	isOpening: boolean;
	isOpened: boolean;
	isClosing: boolean;
	isClosed: boolean;
	isInAction: boolean;
	lock: () => void;
	unlock: () => void;
	open: () => void;
	close: () => void;
	toggle: (action?: TToggleAction) => void;
}

const isCloseAction = (action: TToggleAction): boolean => {
	return action === 'close';
}

export const useToggle = (
	initialStatus: TToggleStatus = 'closed',
	duration: number = 300
): IUseToggle => {
	const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [status, setStatus] = useState<TToggleStatus>(initialStatus);
	const isLocked = useRef<boolean>(false);
	const isClosing = useMemo(() => status === 'closing', [status]);
	const isClosed = useMemo(() => status === 'closed', [status]);
	const isOpening = useMemo(() => status === 'opening', [status]);
	const isOpened = useMemo(() => status === 'opened', [status]);
	const isInAction = useMemo(() => isClosing || isOpening, [isClosing, isOpening]);

	useEffect(() => {
		return () => {
			if (timeout.current) {
				clearTimeout(timeout.current);
			}
		};
	}, []);

	const toggle = useCallback((action: TToggleAction) => {
		if (isLocked.current) {
			return;
		}

		if (isInAction) {
			return;
		}

		if (action && isCloseAction(action) && isClosed) {
			return;
		}

		if (action && !isCloseAction(action) && !isClosed) {
			return;
		}

		const wasOpened = (action && isCloseAction(action)) || isOpened;

		setStatus(wasOpened ? 'closing' : 'opening');

		timeout.current = setTimeout(() => setStatus(wasOpened ? 'closed' : 'opened'), duration);
	}, [isInAction, isClosed, isOpened, duration]);

	const open = useCallback(() => toggle('open'), [toggle]);
	const close = useCallback(() => toggle('close'), [toggle]);
	const lock = useCallback(() => isLocked.current = true, []);
	const unlock = useCallback(() => isLocked.current = false, []);

	return {
		status,
		isClosing,
		isClosed,
		isOpening,
		isOpened,
		isInAction,
		isLocked,
		open,
		close,
		lock,
		unlock,
		toggle
	}
}