import { CdkDropList } from '@angular/cdk/drag-drop';

/**
 * Direction in which the items of a `mixed` list flow: along rows that wrap (a grid read line by line), or along columns that wrap
 */
export type ReorderFlow = 'row' | 'column';

/**
 * Action of the handles that can be left out: moving the item to the start / end of its list is also done by moving it
 * one position at a time, so leaving it out never prevents a move
 */
export type ReorderOptionalAction = 'first' | 'last';

/**
 * Entry of the handle menu: moving the item by one position (`previous` / `next`), to the start / end of its list (`first` / `last`),
 * or to a connected list (`lists`)
 */
export type ReorderMenuEntry = 'previous' | 'next' | 'first' | 'last' | 'lists';

/**
 * Emitted by `luReorder` whenever an item is moved, whether it was dragged with a pointer
 * or moved with the handle menu or keyboard shortcuts.
 * Its properties share their names with `CdkDragDrop` so the usual `moveItemInArray` / `transferArrayItem` handlers keep working.
 */
export interface ReorderEvent<T = unknown, O = T> {
	previousIndex: number;
	currentIndex: number;
	previousContainer: CdkDropList<O>;
	container: CdkDropList<T>;
}
