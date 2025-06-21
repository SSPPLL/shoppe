import { useRef, useCallback } from "react";

export interface IRafTimeoutControls {
	timeout: (callback: () => void, delay: number) => void;
	stop: () => void;
	pause: () => void;
	resume: () => void;
}

export const useRafTimeout = (): IRafTimeoutControls => {
	const frame = useRef<number>(0);
	const startTime = useRef<number>(0);
	const remaining = useRef<number>(0);
	const running = useRef<boolean>(false);
	const paused = useRef<boolean>(false);
	const savedCallback = useRef<() => void | null>(null);

	const checkTime = useCallback((now: number) => {
		if (!running.current || !savedCallback.current) return;

		if (!paused.current && now - startTime.current >= remaining.current) {
			running.current = false;
			savedCallback.current();
			return;
		}

		frame.current = requestAnimationFrame(checkTime);
	}, []);

	const timeout = useCallback((callback: () => void, delay: number) => {
		savedCallback.current = callback;
		startTime.current = performance.now();
		remaining.current = delay;
		running.current = true;
		paused.current = false;

		if (frame.current) cancelAnimationFrame(frame.current);
		frame.current = requestAnimationFrame(checkTime);
	}, [checkTime]);

	const stop = useCallback(() => {
		running.current = false;
		if (frame.current) cancelAnimationFrame(frame.current);
	}, []);

	const pause = useCallback(() => {
		if (!running.current || paused.current) return;
		paused.current = true;
		remaining.current -= performance.now() - startTime.current;
		if (frame.current) cancelAnimationFrame(frame.current);
	}, []);

	const resume = useCallback(() => {
		if (!running.current || !paused.current) return;
		paused.current = false;
		startTime.current = performance.now();
		frame.current = requestAnimationFrame(checkTime);
	}, [checkTime]);

	return { timeout, stop, pause, resume };
};
