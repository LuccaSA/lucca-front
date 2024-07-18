import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { DestroyRef, EventEmitter, Injectable, QueryList, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, asyncScheduler, debounceTime, filter, map, observeOn, take } from 'rxjs';
import { ɵLuOptionComponent } from '../option';

interface CoreSelectKeyManagerOptions<T> {
	queryList: QueryList<ɵLuOptionComponent<T>>;
	options$: Observable<T[]>;
	optionComparer: (a: T, b: T) => boolean;
	activeOptionIdChanged$: EventEmitter<string>;
	clueChange$: Observable<string>;
}

@Injectable()
export class CoreSelectKeyManager<T> {
	#destroyRef = inject(DestroyRef);
	#cdkKeyManager?: ActiveDescendantKeyManager<ɵLuOptionComponent<T>>;
	#hasSearchChanged = false;
	#options?: CoreSelectKeyManagerOptions<T>;

	init(options: CoreSelectKeyManagerOptions<T>): void {
		this.#options = options;
		this.#cdkKeyManager = new ActiveDescendantKeyManager(options.queryList).withHomeAndEnd();
		this.#bindClueChange(options.clueChange$);
		this.#bindOptionsChange(options);
		this.#bindActiveOptionIdChanged(options.activeOptionIdChanged$);
		this.#cdkKeyManager.setFirstItemActive();
	}

	onKeydown(event: KeyboardEvent): void {
		this.#cdkKeyManager?.onKeydown(event);
	}

	get activeItem(): ɵLuOptionComponent<T> | undefined {
		return this.#cdkKeyManager?.activeItem;
	}

	get activeItemIndex(): number {
		return this.#cdkKeyManager?.activeItemIndex ?? -1;
	}

	highlightOption(option: T): void {
		if (!this.#options) {
			return;
		}

		const { options$, optionComparer } = this.#options;

		options$
			.pipe(
				observeOn(asyncScheduler),
				map((options) => options.findIndex((o) => optionComparer(o, option))),
				filter((index) => index !== -1),
				take(1),
				takeUntilDestroyed(this.#destroyRef),
			)
			.subscribe((selectedIndex) => this.setActiveItem(selectedIndex));
	}

	setActiveItem(index: number): void {
		this.#cdkKeyManager?.setActiveItem(index);
	}

	#bindClueChange(clueChange$: Observable<string>): void {
		clueChange$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
			this.#hasSearchChanged = true;
		});
	}

	#bindActiveOptionIdChanged(activeOptionIdChanged$: EventEmitter<string>): void {
		this.#cdkKeyManager.change
			.pipe(
				map(() => this.#cdkKeyManager.activeItem?.id),
				takeUntilDestroyed(this.#destroyRef),
			)
			.subscribe((activeDescendant) => activeOptionIdChanged$.emit(activeDescendant));
	}

	/**
	 * Ensure always have the correct highlighted item:
	 * 	- reset to null if no options
	 * 	- set to first item if search has changed
	 * 	- set to first item if no active item
	 */
	#bindOptionsChange({ options$, queryList }: CoreSelectKeyManagerOptions<T>): void {
		options$
			.pipe(
				debounceTime(0), // Wait until QueryList is updated
				takeUntilDestroyed(this.#destroyRef),
			)
			.subscribe(() => {
				if (queryList.length === 0) {
					this.#cdkKeyManager.setActiveItem(-1);
				} else if (this.#hasSearchChanged) {
					this.#hasSearchChanged = false;
					this.#cdkKeyManager.setFirstItemActive();
				} else if (!this.#cdkKeyManager.activeItem) {
					this.#cdkKeyManager.setFirstItemActive();
				}
			});
	}
}
