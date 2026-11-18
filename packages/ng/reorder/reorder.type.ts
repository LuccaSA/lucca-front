import { CdkDropList } from '@angular/cdk/drag-drop';

/**
 * Direction in which the items of a `mixed` list flow: along rows that wrap (a grid read line by line), or along columns that wrap
 */
export type ReorderFlow = 'row' | 'column';

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

export const REORDER_HANDLE_SIZE = ['S', 'XS'] as const;

/**
 * Size of the handle button
 */
export type ReorderHandleSize = (typeof REORDER_HANDLE_SIZE)[number];
