import { CdkDrag } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import type { ReorderHandleComponent } from './reorder-handle.component';
import type { ReorderDirective } from './reorder.directive';

/**
 * Keeps track of every `luReorder` list and `lu-reorder-handle`, so a list can find the lists it is connected to
 * (the CDK keeps a group's lists private) and the handle to focus once an item has been moved.
 */
@Injectable({ providedIn: 'root' })
export class ReorderRegistry {
	readonly lists = new Set<ReorderDirective>();

	readonly handles = new Map<CdkDrag, ReorderHandleComponent>();
}
