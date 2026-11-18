import { LiveAnnouncer } from '@angular/cdk/a11y';
import { coerceArray } from '@angular/cdk/coercion';
import { CDK_DROP_LIST_GROUP, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { afterNextRender, DestroyRef, Directive, inject, Injector, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { intlInputOptions, IntlParamsPipe, luBooleanAttribute } from '@lucca-front/ng/core';
import { ReorderRegistry } from './reorder.registry';
import { LU_REORDER_TRANSLATIONS } from './reorder.translate';
import { ReorderEvent, ReorderFlow } from './reorder.type';

const intlParams = new IntlParamsPipe();

@Directive({
	selector: '[luReorder]',
	exportAs: 'luReorder',
})
export class ReorderDirective<T = unknown> {
	readonly dropList = inject<CdkDropList<T>>(CdkDropList, { self: true });

	readonly #group = inject(CDK_DROP_LIST_GROUP, { optional: true, skipSelf: true });

	readonly #registry = inject(ReorderRegistry);

	readonly #announcer = inject(LiveAnnouncer);

	readonly #injector = inject(Injector);

	#missingListLabelWarned = false;

	#missingItemLabelWarned = false;

	/**
	 * Name of the list, displayed in the "Move to" menu of the connected lists and announced after an item is moved to it
	 */
	readonly luReorderLabel = input<string | null>(null);

	/**
	 * Direction in which the items flow, for a list with `cdkDropListOrientation="mixed"` only: `row` (default) moves the items
	 * with Alt + ← / →, `column` with Alt + ↑ / ↓
	 */
	readonly luReorderFlow = input<ReorderFlow>('row');

	/**
	 * Leaves the moves to the start / end of the list out of the handles, from their menu and their keyboard shortcuts.
	 * The other moves are always offered, as they are the only way to reach every position and every list without a pointer
	 */
	readonly luReorderEdgesExcluded = input(false, { transform: luBooleanAttribute });

	/**
	 * Overrides the default labels of the handles' menu and announcements
	 */
	readonly luReorderIntl = input(...intlInputOptions(LU_REORDER_TRANSLATIONS));

	/**
	 * Emits when an item is moved, by dragging it or with its handle menu or keyboard shortcuts
	 */
	readonly luReorder = output<ReorderEvent<T>>();

	constructor() {
		this.#registry.lists.add(this);
		inject(DestroyRef).onDestroy(() => this.#registry.lists.delete(this));

		this.dropList.dropped.pipe(takeUntilDestroyed()).subscribe(({ item, previousIndex, currentIndex, previousContainer, container }) => {
			// The CDK types the origin list as `CdkDropList<any>`, as a connected list could hold another data type.
			// Connected lists share their data type in practice, which lets `transferArrayItem` be called without any cast
			this.luReorder.emit({ previousIndex, currentIndex, previousContainer: previousContainer as CdkDropList<T>, container });

			// A pointer move is announced like the other ones: a screen reader can be running while dragging
			if (previousContainer !== container || previousIndex !== currentIndex) {
				const origin = [...this.#registry.lists].find((list) => list.dropList === previousContainer) ?? this;
				const itemLabel = this.#registry.handles.get(item)?.itemLabel() ?? this.luReorderIntl().itemFallback;
				afterNextRender(
					() => {
						if (origin.#isApplied(item, currentIndex, this)) {
							origin.#announce(item, currentIndex, itemLabel, this);
						}
					},
					{ injector: this.#injector },
				);
			}
		});
	}

	get element(): HTMLElement {
		return this.dropList.element.nativeElement;
	}

	/**
	 * Items of the list, in their DOM order
	 */
	items(): CdkDrag[] {
		return this.dropList.getSortedItems();
	}

	/**
	 * Lists an item of this list can be moved to, in their DOM order. As when dragging it, a disabled list still receives items:
	 * `cdkDropListDisabled` only prevents dragging items out of it
	 */
	connectedLists(drag: CdkDrag): ReorderDirective[] {
		const connectedTo = coerceArray(this.dropList.connectedTo ?? []);
		return sortByDomPosition(
			[...this.#registry.lists].filter((list) => {
				if (list === this) {
					return false;
				}
				const isConnected = (this.#group !== null && list.#group === this.#group) || connectedTo.some((target) => target === list.dropList || target === list.dropList.id);
				return isConnected && list.dropList.enterPredicate(drag, list.dropList);
			}),
		);
	}

	/**
	 * Name of a list, as displayed in the "Move to" menu: its `luReorderLabel`, or its position among its connected lists
	 */
	listLabel(list: ReorderDirective, peers: ReorderDirective[]): string {
		const label = list.luReorderLabel();
		if (label) {
			return label;
		}
		if (!this.#missingListLabelWarned) {
			this.#missingListLabelWarned = true;
			console.warn('[LuReorder] Missing `luReorderLabel` on a connected list: it is displayed with a generic name in the move menu.');
		}
		const index = sortByDomPosition([this, ...peers]).indexOf(list) + 1;
		return intlParams.transform(this.luReorderIntl().listFallback, { index });
	}

	warnMissingItemLabel(): void {
		if (!this.#missingItemLabelWarned) {
			this.#missingItemLabelWarned = true;
			console.warn('[LuReorder] Missing `luReorderItemLabel` on a cdkDrag item: its handle is announced as "Move" only.');
		}
	}

	/**
	 * Moves an item of this list to `currentIndex` in `target`, then focuses its handle and announces its new position,
	 * once the `luReorder` handler has applied the move
	 */
	move(drag: CdkDrag, currentIndex: number, itemLabel: string, target: ReorderDirective = this): void {
		const previousIndex = this.items().indexOf(drag);
		if (previousIndex === -1 || (target === this && previousIndex === currentIndex)) {
			return;
		}

		target.luReorder.emit({ previousIndex, currentIndex, previousContainer: this.dropList, container: target.dropList });

		afterNextRender(
			() => {
				if (!this.#isApplied(drag, currentIndex, target)) {
					return;
				}
				const moved = target.items()[currentIndex];
				if (moved) {
					this.#registry.handles.get(moved)?.focus();
				}
				this.#announce(drag, currentIndex, itemLabel, target);
			},
			{ injector: this.#injector },
		);
	}

	/**
	 * Whether the `luReorder` handler has applied the move of an item from this list, by the next render: it may refuse it,
	 * or apply it later (after an API call). Within a list, the item is then at its new position. Moved to another list,
	 * the item is rendered again there: it is only checked that it left this list.
	 * Focusing and announcing an unapplied move would mislead, so nothing happens then
	 */
	#isApplied(drag: CdkDrag, currentIndex: number, target: ReorderDirective): boolean {
		return target === this ? this.items()[currentIndex] === drag : !this.items().includes(drag);
	}

	/**
	 * Announces the new position of an item moved from this list, once the target list displays it
	 */
	#announce(drag: CdkDrag, currentIndex: number, itemLabel: string, target: ReorderDirective): void {
		const intl = target.luReorderIntl();
		const params = { item: itemLabel, position: currentIndex + 1, count: target.items().length };
		const message =
			target === this ? intlParams.transform(intl.announceMove, params) : intlParams.transform(intl.announceMoveTo, { ...params, list: this.listLabel(target, this.connectedLists(drag)) });
		void this.#announcer.announce(message);
	}
}

function sortByDomPosition(lists: ReorderDirective[]): ReorderDirective[] {
	return [...lists].sort((a, b) => (a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
}
