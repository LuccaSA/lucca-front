import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { DestroyRef, EventEmitter, inject, Injectable, Injector, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { asyncScheduler, debounceTime, filter, map, Observable, observeOn, take } from 'rxjs';
import { LuOptionComparer } from '../select.model';
import { CoreSelectPanelElement } from './selectable-item';

interface CoreSelectKeyManagerOptions<T> {
	queryList: Signal<readonly CoreSelectPanelElement<T>[]>;
	options$: Observable<readonly T[]>;
	optionComparer: LuOptionComparer<T>;
	activeOptionIdChanged$: EventEmitter<string>;
	clueChange$: Observable<string>;
}

@Injectable()
export class CoreSelectKeyManager<T> {
	#destroyRef = inject(DestroyRef);
	#cdkKeyManager?: ActiveDescendantKeyManager<CoreSelectPanelElement<T>>;
	#hasSearchChanged = false;
	#options?: CoreSelectKeyManagerOptions<T>;
	#injector = inject(Injector);

	init(options: CoreSelectKeyManagerOptions<T>): void {
		this.#options = options;
		this.#cdkKeyManager = new ActiveDescendantKeyManager(options.queryList, this.#injector).withHomeAndEnd();
		this.#bindClueChange(options.clueChange$);
		this.#bindOptionsChange(options);
		this.#bindActiveOptionIdChanged(options.activeOptionIdChanged$);
		this.#cdkKeyManager.setFirstItemActive();
	}

	onKeydown(event: KeyboardEvent): void {
		this.#cdkKeyManager?.onKeydown(event);
	}

	get activeItem(): CoreSelectPanelElement<T> | undefined {
		return this.#cdkKeyManager?.activeItem;
	}

	get activeItemIndex(): number {
		return this.#cdkKeyManager?.activeItemIndex ?? -1;
	}

	setActiveItem(index: number): void {
		this.#cdkKeyManager?.setActiveItem(index);
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
				if (queryList().length === 0) {
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
