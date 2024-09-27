import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom Hook Event Callback
 * @param fn
 * @param options
 */
export function useEventCallback<T = any>(
	fn: (e?: T) => void,
	options: { listen_change?: boolean; event?: string } = { listen_change: true },
): (e?: T) => any {
	let listen_change = options.listen_change !== undefined ? options.listen_change : true;
	const ref = useRef<(e?: T) => void>(() => { });

	useEffect(() => {
		ref.current = fn;
	}, [listen_change && fn]);

	return useCallback(
		e => {
			return typeof ref.current === 'function' && ref.current(e);
		},
		[ref],
	);
}

/**
 * Handle Event function
 * @param callback
 * @param options
 */
export function useOnPressCallback<T extends (...args: any[]) => any>(
	callback: T,
	options: { listen_change?: boolean; time?: number; event?: string } = { listen_change: true, time: 1000 },
): T {
	let listen_change = options.listen_change !== undefined ? options.listen_change : true;
	const ref = useRef<T>((() => { }) as T);

	useEffect(() => {
		if (typeof callback === 'function') {
			ref.current = callback;
		}
	}, [listen_change && callback]);

	return useCallback<T>(
		((...args) => {
			return ref.current(...args);
		}) as T,
		[],
	);
}

/**
 * Handle function
 * @param callback
 * @param options
 */
export function useOnEventCallback<T extends (...args: any[]) => any>(callback: T, options?: { event?: string }): T {
	const ref = useRef<T>((() => { }) as T);

	if (typeof callback === 'function') {
		ref.current = callback;
	}

	return useCallback<T>(
		((...args) => {
			return ref.current(...args);
		}) as T,
		[],
	);
}
