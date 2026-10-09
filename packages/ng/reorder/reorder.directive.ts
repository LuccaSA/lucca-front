import { LiveAnnouncer } from '@angular/cdk/a11y';
import { coerceArray } from '@angular/cdk/coercion';
import { CDK_DROP_LIST_GROUP, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { afterNextRender, DestroyRef, Directive, inject, Injector, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { intlInputOptions, IntlParamsPipe } from '@lucca-front/ng/core';
import { ReorderRegistry } from './reorder.registry';
import { LU_REORDER_TRANSLATIONS } from './reorder.translate';
import { ReorderEvent, ReorderFlow, ReorderMenuEntry, ReorderOptionalAction } from './reorder.type';

const intlParams = new IntlParamsPipe();

const ALL_MENU_ENTRIES: readonly ReorderMenuEntry[] = ['previous', 'next', 'first', 'last', 'lists'];

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
	 * Optional actions left out of the handles, from their menu and their keyboard shortcuts: moving the item to the start / end of its list.
	 * The other actions are always offered, as they are the only way to reach every position and every list without a pointer
	 */
	readonly luReorderActionsExcluded = input<readonly ReorderOptionalAction[]>([]);

	/**
	 * Menu entries whose keyboard shortcut is not displayed, or `true` for every entry. The shortcuts still work
	 * and are still declared to assistive technologies: hiding them only lightens the menu
	 */
	readonly luReorderShortcutsHidden = input<readonly ReorderMenuEntry[], boolean | '' | readonly ReorderMenuEntry[]>([], {
		transform: (value) => (value === true || value === '' ? ALL_MENU_ENTRIES : value || []),
	});

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

		this.dropList.dropped.pipe(takeUntilDestroyed()).subscribe(({ previousIndex, currentIndex, previousContainer, container }) => {
			// The CDK types the origin list as `CdkDropList<any>`, as a connected list could hold another data type.
			// Connected lists share their data type in practice, which lets `transferArrayItem` be called without any cast
			this.luReorder.emit({ previousIndex, currentIndex, previousContainer: previousContainer as CdkDropList<T>, container });
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
	 * Moves an item of this list to `currentIndex` in `target`, then focuses its handle and announces its new position
	 */
	move(drag: CdkDrag, currentIndex: number, itemLabel: string, target: ReorderDirective = this): void {
		const previousIndex = this.items().indexOf(drag);
		if (previousIndex === -1 || (target === this && previousIndex === currentIndex)) {
			return;
		}

		target.luReorder.emit({ previousIndex, currentIndex, previousContainer: this.dropList, container: target.dropList });

		afterNextRender(
			() => {
				const items = target.items();
				const moved = items[currentIndex];
				if (moved) {
					this.#registry.handles.get(moved)?.focus();
				}

				const intl = target.luReorderIntl();
				const params = { item: itemLabel, position: currentIndex + 1, count: items.length };
				const message =
					target === this ? intlParams.transform(intl.announceMove, params) : intlParams.transform(intl.announceMoveTo, { ...params, list: this.listLabel(target, this.connectedLists(drag)) });
				void this.#announcer.announce(message);
			},
			{ injector: this.#injector },
		);
	}
}

function sortByDomPosition(lists: ReorderDirective[]): ReorderDirective[] {
	return [...lists].sort((a, b) => (a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
}
