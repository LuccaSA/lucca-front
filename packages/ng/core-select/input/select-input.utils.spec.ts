import { fakeAsync, tick } from '@angular/core/testing';
import type { Mock } from 'vitest';
import { BehaviorSubject, delay, finalize, identity, map, of, ReplaySubject, skip, Subject, takeUntil, tap, throwError } from 'rxjs';
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

	it('should fall back to accumulated options when transformOptions fails', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$ } = createDeps();
		const ds: SelectDataSource<TestOption> = {
			getOptions: () => of([{ id: 1, name: 'A' }]),
			transformOptions: () => throwError(() => new Error('Additional information error')),
		};
		const emitted: (readonly TestOption[])[] = [];
		let errored = false;

		const sub = buildOptionsFromDataSource(ds, deps).subscribe({
			next: (options) => emitted.push(options),
			error: () => (errored = true),
		});

		isPanelOpen$.next(true);
		clue$.next('');
		tick();

		expect(errored).toBe(false);
		expect(emitted[emitted.length - 1]).toEqual([{ id: 1, name: 'A' }]);

		sub.unsubscribe();
	}));

	it('should fall back to accumulated options when transformOptions throws synchronously', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$ } = createDeps();
		const ds: SelectDataSource<TestOption> = {
			getOptions: () => of([{ id: 1, name: 'A' }]),
			transformOptions: () => {
				throw new Error('Additional information error');
			},
		};
		const emitted: (readonly TestOption[])[] = [];
		let errored = false;

		const sub = buildOptionsFromDataSource(ds, deps).subscribe({
			next: (options) => emitted.push(options),
			error: () => (errored = true),
		});

		isPanelOpen$.next(true);
		clue$.next('');
		tick();

		expect(errored).toBe(false);
		expect(emitted[emitted.length - 1]).toEqual([{ id: 1, name: 'A' }]);

		sub.unsubscribe();
	}));

	it('should keep loading next pages after a transformOptions failure', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$, nextPage$ } = createDeps();
		let transformCall = 0;
		const ds: SelectDataSource<TestOption> = {
			getOptions: ({ page }) => of([{ id: page, name: `Page ${page}` }]),
			transformOptions: (options) => (transformCall++ === 0 ? throwError(() => new Error('Additional information error')) : of(options)),
		};
		const emitted: (readonly TestOption[])[] = [];

		const sub = buildOptionsFromDataSource(ds, deps).subscribe((options) => emitted.push(options));

		isPanelOpen$.next(true);
		clue$.next('');
		tick();
		expect(emitted[emitted.length - 1]).toEqual([{ id: 0, name: 'Page 0' }]);

		nextPage$.next();
		tick();
		expect(emitted[emitted.length - 1]).toEqual([
			{ id: 0, name: 'Page 0' },
			{ id: 1, name: 'Page 1' },
		]);

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

	it('should ask for a single page when the panel asks twice while a page is still loading', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$, nextPage$ } = createDeps();
		const ds: SelectDataSource<TestOption> & { getOptions: Mock } = {
			getOptions: vi.fn(({ page }) => of([{ id: page, name: `Page ${page}` }]).pipe(delay(10))),
		};
		const emitted: (readonly TestOption[])[] = [];

		const sub = buildOptionsFromDataSource(ds, deps).subscribe((options) => emitted.push(options));

		isPanelOpen$.next(true);
		clue$.next('');
		tick(10);

		// Firefox emits two scroll events at the bottom of the panel where Chrome emits one
		nextPage$.next();
		nextPage$.next();
		tick(10);

		expect(ds.getOptions).toHaveBeenCalledTimes(2);
		expect(emitted[emitted.length - 1]).toEqual([
			{ id: 0, name: 'Page 0' },
			{ id: 1, name: 'Page 1' },
		]);

		sub.unsubscribe();
	}));

	it('should keep paginating when a page loads right after an empty one', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$, nextPage$ } = createDeps();
		const pages: TestOption[][] = [[{ id: 0, name: 'Page 0' }], [], [{ id: 2, name: 'Page 2' }]];
		const ds: SelectDataSource<TestOption> = {
			getOptions: ({ page }) => of(pages[page] ?? []).pipe(delay(10)),
		};
		const emitted: (readonly TestOption[])[] = [];

		const sub = buildOptionsFromDataSource(ds, deps).subscribe((options) => emitted.push(options));

		isPanelOpen$.next(true);
		clue$.next('');
		tick(10);

		nextPage$.next(); // page 1: empty
		tick(10);

		nextPage$.next(); // page 2: still loading, must not count as a second empty page
		tick(10);

		expect(emitted[emitted.length - 1]).toEqual([
			{ id: 0, name: 'Page 0' },
			{ id: 2, name: 'Page 2' },
		]);

		sub.unsubscribe();
	}));

	it('should only notify next page requests that are actually honoured', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$, nextPage$ } = createDeps();
		const onPageAccepted = vi.fn();
		const ds: SelectDataSource<TestOption> = {
			getOptions: ({ page }) => of([{ id: page, name: `Page ${page}` }]).pipe(delay(10)),
		};

		const sub = buildOptionsFromDataSource(ds, { ...deps, onPageAccepted }).subscribe();

		isPanelOpen$.next(true);
		clue$.next('');
		tick(10);

		expect(onPageAccepted).not.toHaveBeenCalled(); // initial page is not a next page request

		nextPage$.next();
		nextPage$.next(); // duplicate, dropped while page 1 is loading
		tick(10);

		expect(onPageAccepted).toHaveBeenCalledTimes(1);

		sub.unsubscribe();
	}));

	it('should not drop a pending page when the data source closes its page on accepted requests', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$, nextPage$ } = createDeps();
		// Mirrors the manual `[options]` data source: a long-lived stream of options, closed when the next
		// page is asked — a duplicate request must not close a page that hasn't received its options yet
		const manualOptions$ = new Subject<TestOption[]>();
		const pageAccepted$ = new Subject<void>();
		const ds: SelectDataSource<TestOption> = {
			getOptions: () => manualOptions$.pipe(takeUntil(pageAccepted$)),
		};
		const emitted: (readonly TestOption[])[] = [];

		const sub = buildOptionsFromDataSource(ds, { ...deps, onPageAccepted: () => pageAccepted$.next() }).subscribe((options) => emitted.push(options));

		isPanelOpen$.next(true);
		clue$.next('');
		tick();

		manualOptions$.next([{ id: 0, name: 'Page 0' }]);
		tick();

		nextPage$.next();
		nextPage$.next(); // Firefox emits two scroll events at the bottom of the panel

		manualOptions$.next([{ id: 1, name: 'Page 1' }]); // options pushed after the duplicate request
		tick();

		expect(emitted[emitted.length - 1]).toEqual([
			{ id: 0, name: 'Page 0' },
			{ id: 1, name: 'Page 1' },
		]);

		sub.unsubscribe();
	}));

	// Mirrors `getDefaultDataSource` of the select input component, ie. the `[options]` + `(nextPage)` path:
	// a replayed stream of every option the consumer has pushed so far, minus the ones previous pages showed
	function createManualDs(manualOptions$: ReplaySubject<readonly TestOption[]>, pageAccepted$: Subject<void>): SelectDataSource<TestOption> {
		let emittedKeys = new Set<unknown>();
		return {
			getOptions: ({ page }) => {
				let lastEmittedThisPage: readonly TestOption[] = [];
				return manualOptions$.pipe(
					page === 0 ? identity : skip(1),
					tap((options) => (lastEmittedThisPage = options)),
					takeUntil(pageAccepted$),
					finalize(() => (emittedKeys = new Set(lastEmittedThisPage.map((o) => o.id)))),
					map((options) => options.filter((o) => !emittedKeys.has(o.id))),
				);
			},
			reset: () => emittedKeys.clear(),
		};
	}

	it('should display manual options pushed after several next page requests', fakeAsync(() => {
		const { deps, isPanelOpen$, clue$, nextPage$ } = createDeps();
		const manualOptions$ = new ReplaySubject<readonly TestOption[]>(1);
		const pageAccepted$ = new Subject<void>();
		const ds = createManualDs(manualOptions$, pageAccepted$);
		const emitted: (readonly TestOption[])[] = [];

		const sub = buildOptionsFromDataSource(ds, { ...deps, onPageAccepted: () => pageAccepted$.next() }).subscribe((options) => emitted.push(options));

		manualOptions$.next([
			{ id: 1, name: 'A' },
			{ id: 2, name: 'B' },
		]);
		isPanelOpen$.next(true);
		clue$.next('');
		tick();
		expect(emitted[emitted.length - 1]).toHaveLength(2);

		// Firefox fires several scroll events at the bottom of the panel before the consumer answers
		nextPage$.next();
		nextPage$.next();
		nextPage$.next();
		tick(300);
		manualOptions$.next([
			{ id: 1, name: 'A' },
			{ id: 2, name: 'B' },
			{ id: 3, name: 'C' },
			{ id: 4, name: 'D' },
		]);
		tick();

		expect(emitted[emitted.length - 1]).toEqual([
			{ id: 1, name: 'A' },
			{ id: 2, name: 'B' },
			{ id: 3, name: 'C' },
			{ id: 4, name: 'D' },
		]);

		sub.unsubscribe();
	}));
});
