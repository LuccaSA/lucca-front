import { fakeAsync, tick } from '@angular/core/testing';
import type { Mock } from 'vitest';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { SelectDataSource } from '../select.model';
import { buildOptionsFromDataSource, BuildOptionsFromDataSourceDeps } from './select-input.utils';

interface TestOption {
	id: number;
	name: string;
}

function createDeps(): {
	nextPage$: Subject<void>;
	clue$: Subject<string | null>;
	isPanelOpen$: BehaviorSubject<boolean>;
	setLoading: Mock;
	deps: BuildOptionsFromDataSourceDeps;
} {
	const nextPage$ = new Subject<void>();
	const clue$ = new Subject<string | null>();
	const isPanelOpen$ = new BehaviorSubject<boolean>(false);
	const setLoading = vi.fn();
	return { nextPage$, clue$, isPanelOpen$, setLoading, deps: { nextPage$, clue$, isPanelOpen$, setLoading } };
}

function createDs(pages: TestOption[][]): SelectDataSource<TestOption> & { getOptions: Mock; reset: Mock } {
	let callIndex = 0;
	return {
		getOptions: vi.fn(() => of(pages[callIndex++] ?? [])),
		reset: vi.fn(),
	};
}

describe('buildOptionsFromDataSource', () => {
	it('should emit empty array when panel is closed', fakeAsync(() => {
		const { deps } = createDeps();
		const ds = createDs([]);
		const emitted: (readonly TestOption[])[] = [];

		const sub = buildOptionsFromDataSource(ds, deps).subscribe((options: TestOption[]) => emitted.push(options));
		tick();

		expect(emitted).toEqual([[]]); // BehaviorSubject immediately emits false → of([])
		expect(ds.getOptions).not.toHaveBeenCalled();

		sub.unsubscribe();
	}));

	it('should emit options when panel opens and clue emits', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$ } = createDeps();
		const ds = createDs([[{ id: 1, name: 'Option A' }]]);
		const emitted: (readonly TestOption[])[] = [];

		const sub = buildOptionsFromDataSource(ds, deps).subscribe((options: TestOption[]) => emitted.push(options));

		isPanelOpen$.next(true);
		clue$.next('');
		tick();

		expect(emitted[emitted.length - 1]).toEqual([{ id: 1, name: 'Option A' }]);

		sub.unsubscribe();
	}));

	it('should emit empty array when panel closes after being open', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$ } = createDeps();
		const ds = createDs([[{ id: 1, name: 'Option A' }]]);
		const emitted: (readonly TestOption[])[] = [];

		const sub = buildOptionsFromDataSource(ds, deps).subscribe((options: TestOption[]) => emitted.push(options));

		isPanelOpen$.next(true);
		clue$.next('');
		tick();

		isPanelOpen$.next(false);
		tick();

		expect(emitted[emitted.length - 1]).toEqual([]);

		sub.unsubscribe();
	}));

	it('should call ds.reset on each clue change', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$ } = createDeps();
		const ds = createDs([[{ id: 1, name: 'A' }], [{ id: 2, name: 'B' }]]);

		const sub = buildOptionsFromDataSource(ds, deps).subscribe();

		isPanelOpen$.next(true);
		clue$.next('');
		tick();

		clue$.next('test');
		tick();

		expect(ds.reset).toHaveBeenCalledTimes(2);

		sub.unsubscribe();
	}));

	it('should accumulate options across pages', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$, nextPage$ } = createDeps();
		const ds = createDs([
			[{ id: 1, name: 'Page 0' }],
			[{ id: 2, name: 'Page 1' }],
			[], // two empty pages to stop pagination
			[],
		]);
		const emitted: (readonly TestOption[])[] = [];

		const sub = buildOptionsFromDataSource(ds, deps).subscribe((options: TestOption[]) => emitted.push(options));

		isPanelOpen$.next(true);
		clue$.next('');
		tick();

		nextPage$.next();
		tick();

		expect(emitted[emitted.length - 1]).toEqual([
			{ id: 1, name: 'Page 0' },
			{ id: 2, name: 'Page 1' },
		]);

		sub.unsubscribe();
	}));

	it('should stop fetching when two consecutive empty pages are received', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$, nextPage$ } = createDeps();
		const ds = createDs([
			[{ id: 1, name: 'Page 0' }], // page 0: data
			[], // page 1: empty
			[], // page 2: empty → triggers takeWhile stop
			[{ id: 999, name: 'Should never be called' }],
		]);

		const sub = buildOptionsFromDataSource(ds, deps).subscribe();

		isPanelOpen$.next(true);
		clue$.next('');
		tick(); // page 0

		nextPage$.next(); // page 1
		tick();

		nextPage$.next(); // page 2 — triggers takeWhile
		tick();

		nextPage$.next(); // would be page 3, but stream already completed
		tick();

		// pages 0, 1, 2 called; page 3 not called
		expect(ds.getOptions).toHaveBeenCalledTimes(3);

		sub.unsubscribe();
	}));

	it('should not debounce empty clue even when clueDebounceMs is set', fakeAsync(() => {
		const debounceMs = 300;
		const { deps, isPanelOpen$, clue$ } = createDeps();
		const ds: SelectDataSource<TestOption> & { getOptions: Mock } = {
			getOptions: vi.fn(() => of([{ id: 1, name: 'A' }])),
			clueDebounceMs: debounceMs,
		};

		const sub = buildOptionsFromDataSource(ds, deps).subscribe();

		isPanelOpen$.next(true);
		clue$.next(''); // empty clue: should NOT be debounced
		tick(0); // no timer advance needed

		expect(ds.getOptions).toHaveBeenCalledWith({ clue: '', page: 0 });

		sub.unsubscribe();
		tick(debounceMs); // flush any pending timers
	}));

	it('should debounce non-empty clue when clueDebounceMs is set', fakeAsync(() => {
		const debounceMs = 300;
		const { deps, isPanelOpen$, clue$ } = createDeps();
		const ds: SelectDataSource<TestOption> & { getOptions: Mock } = {
			getOptions: vi.fn(() => of([{ id: 1, name: 'A' }])),
			clueDebounceMs: debounceMs,
		};

		const sub = buildOptionsFromDataSource(ds, deps).subscribe();

		isPanelOpen$.next(true);
		clue$.next('test');

		tick(debounceMs - 1);
		expect(ds.getOptions).not.toHaveBeenCalled();

		tick(1);
		expect(ds.getOptions).toHaveBeenCalledWith({ clue: 'test', page: 0 });

		sub.unsubscribe();
		tick(debounceMs); // flush any pending timers
	}));

	it('should return empty array on getOptions error', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$ } = createDeps();
		const ds: SelectDataSource<TestOption> = {
			getOptions: vi.fn(() => throwError(() => new Error('API error'))),
		};
		const emitted: (readonly TestOption[])[] = [];

		const sub = buildOptionsFromDataSource(ds, deps).subscribe((options) => emitted.push(options));

		isPanelOpen$.next(true);
		clue$.next('');
		tick();

		expect(emitted[emitted.length - 1]).toEqual([]);

		sub.unsubscribe();
	}));

	it('should set loading to true when fetching and false when done', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$, setLoading } = createDeps();
		const ds = createDs([[{ id: 1, name: 'A' }]]);

		const sub = buildOptionsFromDataSource(ds, deps).subscribe();

		isPanelOpen$.next(true);
		clue$.next('');
		tick();

		expect(setLoading).toHaveBeenCalledWith(true);
		expect(setLoading).toHaveBeenCalledWith(false);
		const calls = setLoading.mock.calls.map(([v]: [boolean]) => v);
		// loading ends as false
		expect(calls[calls.length - 1]).toBe(false);

		sub.unsubscribe();
	}));

	it('should reset accumulated options when clue changes', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$ } = createDeps();
		const ds: SelectDataSource<TestOption> & { getOptions: Mock } = {
			getOptions: vi
				.fn()
				.mockReturnValueOnce(of([{ id: 1, name: 'First clue result' }]))
				.mockReturnValueOnce(of([{ id: 2, name: 'Second clue result' }])),
		};
		const emitted: (readonly TestOption[])[] = [];

		const sub = buildOptionsFromDataSource(ds, deps).subscribe((options: TestOption[]) => emitted.push(options));

		isPanelOpen$.next(true);
		clue$.next('');
		tick();
		expect(emitted[emitted.length - 1]).toEqual([{ id: 1, name: 'First clue result' }]);

		clue$.next('test');
		tick();
		// new clue: only second result, not accumulated with first
		expect(emitted[emitted.length - 1]).toEqual([{ id: 2, name: 'Second clue result' }]);

		sub.unsubscribe();
	}));

	it('should pass clue and page number to getOptions', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$, nextPage$ } = createDeps();
		const ds: SelectDataSource<TestOption> & { getOptions: Mock } = {
			getOptions: vi
				.fn()
				.mockReturnValueOnce(of([{ id: 1, name: 'A' }]))
				.mockReturnValueOnce(of([{ id: 2, name: 'B' }]))
				.mockReturnValue(of([])),
		};

		const sub = buildOptionsFromDataSource(ds, deps).subscribe();

		isPanelOpen$.next(true);
		clue$.next('hello');
		tick();

		nextPage$.next();
		tick();

		expect(ds.getOptions).toHaveBeenNthCalledWith(1, { clue: 'hello', page: 0 });
		expect(ds.getOptions).toHaveBeenNthCalledWith(2, { clue: 'hello', page: 1 });

		sub.unsubscribe();
	}));
});
