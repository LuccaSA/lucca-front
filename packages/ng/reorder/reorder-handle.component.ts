import { Directionality } from '@angular/cdk/bidi';
import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, ElementRef, inject, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { getIntl, IntlParamsPipe } from '@lucca-front/ng/core';
import { KbdComponent } from '@lucca-front/ng/kbd';
import { DropdownActionComponent, DropdownDividerComponent, DropdownItemComponent, DropdownMenuComponent } from '@lucca-front/ng/dropdown';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { ReorderItemLabelDirective } from './reorder-item-label.directive';
import { ReorderDirective } from './reorder.directive';
import { ReorderRegistry } from './reorder.registry';
import { ReorderMenuEntry } from './reorder.type';
import { LU_REORDER_TRANSLATIONS } from './reorder.translate';

const intlParams = new IntlParamsPipe();

const menuPositions = [
	new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
	new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
];

type ArrowKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

interface EdgeKeys {
	first: string;
	last: string;
}

/**
 * Keys moving the item as far as possible in a direction. Mac laptops type them with Fn and an arrow:
 * Home / End with Fn + ← / →, page up / down with Fn + ↑ / ↓, so Fn + Option + an arrow goes to the end of that direction
 */
const INLINE_EDGE_KEYS: EdgeKeys = { first: 'Home', last: 'End' };
const BLOCK_EDGE_KEYS: EdgeKeys = { first: 'PageUp', last: 'PageDown' };

interface ReorderMenuList {
	list: ReorderDirective;
	label: string;
	/** Same position as in the current list, clamped to the length of the target list */
	index: number;
	/** Set on the closest connected lists before and after the current one (an arrow), and on the first and last ones (Home / End or page up / down) */
	shortcut: string | null;
	/** Every key moving the item to this list: its arrow and its edge key when it is both the closest and the first / last one */
	keys: string[];
}

interface ReorderMenu {
	index: number;
	count: number;
	/** Actions the item can perform from its position: the menu only displays these ones */
	entries: { previous: boolean; next: boolean; first: boolean; last: boolean };
	/** Optional actions offered by the list, whose keyboard shortcuts are declared */
	actions: { first: boolean; last: boolean };
	/** Shortcuts displayed in the menu, on the axis of the list */
	shortcuts: { previous: ArrowKey; next: ArrowKey };
	/** Keys displayed in the menu for the start and the end of the list, on its axis: page up / down in a vertical list (Fn + ↑ / ↓ on Mac) */
	edgeKeys: EdgeKeys;
	/** Every key moving the item to the start / the end of its list: both pairs of edge keys for a list on a single axis */
	firstKeys: string[];
	lastKeys: string[];
	/** Keys moving the item to the first / last connected lists, on the cross axis of the list */
	listEdgeKeys: { first: string | null; last: string | null };
	/** Cross axis edge keys of a list with connected lists, handled even when there is no list in that direction */
	crossEdgeKeys: string[];
	/** Every key moving the item within its list: a list on a single axis also accepts the arrows of the other one */
	keys: { previous: ArrowKey[]; next: ArrowKey[] };
	labels: { previous: string; next: string; first: string; last: string };
	lists: ReorderMenuList[];
	/** Keys moving the item to the closest connected lists, on the cross axis of the list */
	listKeys: { previous: ArrowKey | null; next: ArrowKey | null };
	/** Cross axis keys of a list with connected lists, handled even when there is no list in that direction */
	crossKeys: ArrowKey[];
}

@Component({
	selector: '[lu-reorder-handle]',
	templateUrl: './reorder-handle.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [DropdownMenuComponent, DropdownItemComponent, DropdownActionComponent, DropdownDividerComponent, KbdComponent, NgTemplateOutlet],
	hostDirectives: [CdkDragHandle, PopoverDirective],
	host: {
		type: 'button',
		'[attr.aria-keyshortcuts]': 'keyShortcuts()',
		'[attr.aria-disabled]': 'cannotMove() ? "true" : null',
		'(keydown)': 'onKeydown($event)',
		'(pointerdown)': 'updateMenuAvailability()',
	},
})
export class ReorderHandleComponent {
	readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	readonly #popover = inject(PopoverDirective);

	readonly #drag = inject(CdkDrag);

	readonly #reorder = inject(ReorderDirective, { optional: true });

	readonly #itemLabel = inject(ReorderItemLabelDirective, { optional: true });

	readonly #dir = inject(Directionality, { optional: true });

	readonly #defaultIntl = getIntl(LU_REORDER_TRANSLATIONS);

	readonly menuTemplate = viewChild.required<TemplateRef<unknown>>('menuTemplate');

	readonly intl = computed(() => this.#reorder?.luReorderIntl() ?? this.#defaultIntl);

	readonly label = computed(() => {
		const item = this.#itemLabel?.luReorderItemLabel();
		return item ? intlParams.transform(this.intl().moveItem, { item }) : this.intl().move;
	});

	/**
	 * Not a computed signal: the list orientation is not a signal
	 */
	keyShortcuts(): string | null {
		const menu = this.#getMenu(false);
		if (!menu || this.cannotMove()) {
			return null;
		}
		return [
			...menu.keys.previous,
			...menu.keys.next,
			menu.listKeys.previous,
			menu.listKeys.next,
			...(menu.actions.first ? menu.firstKeys : []),
			...(menu.actions.last ? menu.lastKeys : []),
			menu.listEdgeKeys.first,
			menu.listEdgeKeys.last,
		]
			.filter(Boolean)
			.map((key) => `Alt+${key}`)
			.join(' ');
	}

	/**
	 * Whether its item cannot be moved anywhere, even when dragging it: the handle stays focusable, but is announced and displayed as disabled.
	 * Not a computed signal: the items and the connected lists are not signals
	 */
	cannotMove(): boolean {
		const reorder = this.#reorder;
		if (!reorder) {
			return false;
		}
		return this.#drag.disabled || (reorder.items().length <= 1 && reorder.connectedLists(this.#drag).length === 0);
	}

	/**
	 * Recomputed each time the menu opens, as the item position changes with every move
	 */
	/**
	 * Whether the shortcut of a menu entry is displayed
	 */
	shortcutDisplayed(entry: ReorderMenuEntry): boolean {
		return !this.#reorder?.luReorderShortcutsHidden().includes(entry);
	}

	readonly menu = computed<ReorderMenu | null>(() => {
		if (!this.#popover.opened()) {
			return null;
		}
		return this.#getMenu();
	});

	constructor() {
		const registry = inject(ReorderRegistry);
		registry.handles.set(this.#drag, this);
		inject(DestroyRef).onDestroy(() => {
			if (registry.handles.get(this.#drag) === this) {
				registry.handles.delete(this.#drag);
			}
		});

		if (!this.#reorder) {
			this.#popover.luPopoverDisabled.set(true);
			console.warn('[LuReorder] `lu-reorder-handle` is used in a cdkDropList without `luReorder`: its move menu and keyboard shortcuts are disabled.');
		} else if (!this.#itemLabel) {
			this.#reorder.warnMissingItemLabel();
		}

		this.#popover.luPopoverNoCloseButton.set(true);
		this.#popover.luPopoverPositionRef.set('below');
		this.#popover.customPositions.set(menuPositions);
		effect(() => this.#popover.content.set(this.menuTemplate()));
	}

	focus(): void {
		this.#elementRef.nativeElement.focus();
	}

	moveTo(currentIndex: number, target?: ReorderDirective): void {
		this.#reorder?.move(this.#drag, currentIndex, this.#itemLabel?.luReorderItemLabel() || this.intl().itemFallback, target);
	}

	/**
	 * Called before the popover handles the click (pointerdown, or keydown for Enter and Space), as the menu entries depend on the item position
	 * and on the lists able to receive it, which are not signals
	 */
	updateMenuAvailability(): void {
		const menu = this.#getMenu(false);
		this.#popover.luPopoverDisabled.set(!menu || !(menu.entries.previous || menu.entries.next || menu.lists.length));
	}

	onKeydown(event: KeyboardEvent): void {
		this.updateMenuAvailability();
		this.#handleShortcut(event);
	}

	/**
	 * The shortcuts displayed in the menu also work from its entries: they move the item, then close the menu,
	 * so the focus goes back to the handle of the moved item, as when choosing an entry
	 */
	onMenuKeydown(event: KeyboardEvent): void {
		if (this.#handleShortcut(event)) {
			this.#popover.close();
		}
	}

	/**
	 * Returns whether the item was moved
	 */
	#handleShortcut(event: KeyboardEvent): boolean {
		if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
			return false;
		}
		const menu = this.#getMenu(false);
		if (!menu) {
			return false;
		}
		const key = event.key;
		const isPrevious = menu.keys.previous.includes(key as ArrowKey);
		const isNext = menu.keys.next.includes(key as ArrowKey);
		const isList = menu.crossKeys.includes(key as ArrowKey) || menu.crossEdgeKeys.includes(key);
		const isFirst = menu.firstKeys.includes(key);
		const isLast = menu.lastKeys.includes(key);
		if (!isPrevious && !isNext && !isList && !isFirst && !isLast) {
			return false;
		}
		// The shortcut is handled here even at the edges of the list, so it never reaches global shortcuts of the page
		// (such as the browser history navigation on Alt + ← / →, which preventDefault blocks in Chrome, Edge and Firefox)
		event.preventDefault();
		event.stopPropagation();
		if (isList) {
			const target = menu.lists.find(({ keys }) => keys.includes(key));
			if (target) {
				this.moveTo(target.index, target.list);
				return true;
			}
		} else if (isFirst && menu.entries.first) {
			this.moveTo(0);
			return true;
		} else if (isLast && menu.entries.last) {
			this.moveTo(menu.count - 1);
			return true;
		} else if (isPrevious && menu.index > 0) {
			this.moveTo(menu.index - 1);
			return true;
		} else if (isNext && menu.index < menu.count - 1) {
			this.moveTo(menu.index + 1);
			return true;
		}
		return false;
	}

	/**
	 * Arrow shortcuts follow the list orientation and the reading direction:
	 * - the axis of the list moves the item within it,
	 * - the cross axis moves it to the closest connected list (a kanban column, a row of lists),
	 * - without connected list, the cross axis also moves the item within its list, like a radio group, as the item order is unambiguous,
	 * - a `mixed` list (a grid) only uses the arrows of its flow: left and right along rows, as up and down would be expected to change rows,
	 *   and up and down along columns (`luReorderFlow="column"`).
	 *
	 * Shortcuts do not need the list labels: skipping them avoids reading the label of a list whose inputs are not set yet on first render.
	 *
	 * An item that cannot be dragged (`cdkDragDisabled`, or `cdkDropListDisabled` on its list) cannot be moved with its handle either.
	 */
	#getMenu(withListLabels = true): ReorderMenu | null {
		const reorder = this.#reorder;
		if (!reorder || this.#drag.disabled) {
			return null;
		}
		const intl = this.intl();
		const items = reorder.items();
		const excluded = reorder.luReorderActionsExcluded();
		const first = !excluded.includes('first');
		const last = !excluded.includes('last');
		const index = items.indexOf(this.#drag);
		const orientation = reorder.dropList.orientation;
		// A mixed list flowing along columns is ordered vertically, like a vertical list
		const vertical = orientation === 'vertical' || (orientation === 'mixed' && reorder.luReorderFlow() === 'column');
		const rtl = this.#dir?.value === 'rtl';

		const up: ArrowKey = 'ArrowUp';
		const down: ArrowKey = 'ArrowDown';
		const left: ArrowKey = 'ArrowLeft';
		const right: ArrowKey = 'ArrowRight';
		const [inlinePrevious, inlineNext] = rtl ? [right, left] : [left, right];
		const [axisPrevious, axisNext] = vertical ? [up, down] : [inlinePrevious, inlineNext];
		const [crossPrevious, crossNext] = vertical ? [inlinePrevious, inlineNext] : [up, down];

		const connectedLists = reorder.connectedLists(this.#drag);
		const twoDimensions = orientation !== 'mixed' && connectedLists.length > 0;
		const previousList = twoDimensions ? connectedLists.filter((list) => list.element.compareDocumentPosition(reorder.element) & Node.DOCUMENT_POSITION_FOLLOWING).at(-1) : undefined;
		const nextList = twoDimensions ? connectedLists.find((list) => list.element.compareDocumentPosition(reorder.element) & Node.DOCUMENT_POSITION_PRECEDING) : undefined;
		const crossKeys = orientation === 'mixed' || twoDimensions ? { previous: [], next: [] } : { previous: [crossPrevious], next: [crossNext] };

		// Edge keys follow the arrows: the axis of the list goes to its start / end, the cross axis to the first / last connected list
		const [axisEdge, crossEdge] = vertical ? [BLOCK_EDGE_KEYS, INLINE_EDGE_KEYS] : [INLINE_EDGE_KEYS, BLOCK_EDGE_KEYS];
		const firstList = twoDimensions ? connectedLists.find((list) => list.element.compareDocumentPosition(reorder.element) & Node.DOCUMENT_POSITION_FOLLOWING) : undefined;
		const lastList = twoDimensions ? connectedLists.filter((list) => list.element.compareDocumentPosition(reorder.element) & Node.DOCUMENT_POSITION_PRECEDING).at(-1) : undefined;
		const listKeys = (list: ReorderDirective): string[] =>
			[list === previousList && crossPrevious, list === nextList && crossNext, list === firstList && crossEdge.first, list === lastList && crossEdge.last].filter((key): key is string => !!key);

		return {
			index,
			count: items.length,
			entries: { previous: index > 0, next: index < items.length - 1, first: first && index > 0, last: last && index < items.length - 1 },
			actions: { first, last },
			shortcuts: { previous: axisPrevious, next: axisNext },
			edgeKeys: axisEdge,
			firstKeys: twoDimensions ? [axisEdge.first] : [INLINE_EDGE_KEYS.first, BLOCK_EDGE_KEYS.first],
			lastKeys: twoDimensions ? [axisEdge.last] : [INLINE_EDGE_KEYS.last, BLOCK_EDGE_KEYS.last],
			listEdgeKeys: { first: firstList ? crossEdge.first : null, last: lastList ? crossEdge.last : null },
			crossEdgeKeys: twoDimensions ? [crossEdge.first, crossEdge.last] : [],
			keys: { previous: [axisPrevious, ...crossKeys.previous], next: [axisNext, ...crossKeys.next] },
			labels: vertical
				? { previous: intl.moveUp, next: intl.moveDown, first: intl.moveFirst, last: intl.moveLast }
				: { previous: rtl ? intl.moveRight : intl.moveLeft, next: rtl ? intl.moveLeft : intl.moveRight, first: intl.moveStart, last: intl.moveEnd },
			lists: connectedLists.map((list) => ({
				list,
				label: withListLabels ? intlParams.transform(intl.moveToList, { list: reorder.listLabel(list, connectedLists) }) : '',
				index: Math.min(index, list.items().length),
				// The arrow is displayed rather than the edge key when the list is both the closest and the first / last one
				shortcut: listKeys(list)[0] ?? null,
				keys: listKeys(list),
			})),
			listKeys: { previous: previousList ? crossPrevious : null, next: nextList ? crossNext : null },
			crossKeys: twoDimensions ? [crossPrevious, crossNext] : [],
		};
	}
}
