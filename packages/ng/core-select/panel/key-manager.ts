import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { computed, DestroyRef, EventEmitter, inject, Injectable, Injector, Signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { isNotNil } from '@lucca-front/ng/core';
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

	#queryList: Signal<CoreSelectPanelElement<T>[]>;
	#queryList$: Observable<CoreSelectPanelElement<T>[]>;

	init(options: CoreSelectKeyManagerOptions<T>): void {
		this.#options = options;
		this.#queryList = computed(() => {
			return [...options.queryList()].sort((a, b) => {
				const comparison = a.elementRef.nativeElement.compareDocumentPosition(b.elementRef.nativeElement);
				if (comparison & Node.DOCUMENT_POSITION_FOLLOWING) {
					return -1;
				}
				if (comparison & Node.DOCUMENT_POSITION_PRECEDING) {
					return 1;
				}
				return 0;
			});
		});
		this.#queryList$ = toObservable(this.#queryList, { injector: this.#injector });
		this.#cdkKeyManager = new ActiveDescendantKeyManager(this.#queryList, this.#injector).withHomeAndEnd();
		this.#bindClueChange(options.clueChange$);
		this.#bindOptionsChange(options);
		this.#bindActiveOptionIdChanged(options.activeOptionIdChanged$);
		this.#cdkKeyManager.setFirstItemActive();
	}

	onKeydown(event: KeyboardEvent): void {
		this.#cdkKeyManager?.onKeydown(event);
	}

	get activeItem(): CoreSelectPanelElement<T> | undefined {
		return this.#cdkKeyManager?.activeItem ?? undefined;
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

		const { optionComparer } = this.#options;

		this.#queryList$
			.pipe(
				observeOn(asyncScheduler),
				map((options) =>
					options.findIndex((el) => {
						const elOption = el.option();
						return isNotNil(elOption) && optionComparer(elOption, option);
					}),
				),
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
		const keyManager = this.#cdkKeyManager;
		if (!keyManager) {
			return;
		}

		keyManager.change
			.pipe(
				map(() => keyManager.activeItem?.idAttribute() ?? ''),
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
	#bindOptionsChange({ options$ }: CoreSelectKeyManagerOptions<T>): void {
		const keyManager = this.#cdkKeyManager;
		if (!keyManager) {
			return;
		}

		options$
			.pipe(
				debounceTime(0), // Wait until QueryList is updated
				takeUntilDestroyed(this.#destroyRef),
			)
			.subscribe(() => {
				if (this.#queryList().length === 0) {
					keyManager.setActiveItem(-1);
				} else if (this.#hasSearchChanged) {
					this.#hasSearchChanged = false;
					keyManager.setFirstItemActive();
				} else if (!keyManager.activeItem) {
					keyManager.setFirstItemActive();
				}
			});
	}
}
