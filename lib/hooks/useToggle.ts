import { Ref, useCallback, useMemo, useRef, useState } from 'react';
import { useRafTimeout } from './useRafTimeout';

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
	open: () => Promise<void>;
	close: () => Promise<void>;
	toggle: (action?: TToggleAction) => Promise<void>;
}

const isCloseAction = (action: TToggleAction): boolean => {
	return action === 'close';
}

export const useToggle = (
	initialStatus: TToggleStatus = 'closed',
	duration: number = 300
): IUseToggle => {
	const { timeout } = useRafTimeout();
	const [status, setStatus] = useState<TToggleStatus>(initialStatus);
	const isLocked = useRef<boolean>(false);
	const isClosing = useMemo(() => status === 'closing', [status]);
	const isClosed = useMemo(() => status === 'closed', [status]);
	const isOpening = useMemo(() => status === 'opening', [status]);
	const isOpened = useMemo(() => status === 'opened', [status]);
	const isInAction = useMemo(() => isClosing || isOpening, [isClosing, isOpening]);

	const makeTimoutTransition = useCallback((duration: number = 0): Promise<void> => {
		return new Promise(resolve => timeout(resolve, duration))
	}, [timeout]);

	const toggle = useCallback(async (action: TToggleAction): Promise<void> => {
		if (isLocked.current || isInAction) {
			return;
		}

		if (action && ((isCloseAction(action) && isClosed) || (!isCloseAction(action) && !isClosed))) {
			return;
		}

		const wasOpened = (action && isCloseAction(action)) || isOpened;

		await makeTimoutTransition(10);

		setStatus(wasOpened ? 'closing' : 'opening');

		await makeTimoutTransition(duration);

		setStatus(wasOpened ? 'closed' : 'opened');
	}, [isInAction, isClosed, isOpened, makeTimoutTransition, duration]);

	const open = useCallback((): Promise<void> => toggle('open'), [toggle]);
	const close = useCallback((): Promise<void> => toggle('close'), [toggle]);
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