import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, signal, viewChild, viewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ReorderHandleComponent } from './reorder-handle.component';
import { ReorderItemLabelDirective } from './reorder-item-label.directive';
import { ReorderDirective } from './reorder.directive';
import { ReorderEvent } from './reorder.type';

@Component({
	selector: 'lu-reorder-single-list-test',
	imports: [CdkDropList, CdkDrag, ReorderDirective, ReorderItemLabelDirective, ReorderHandleComponent],
	template: `
		<ul cdkDropList luReorder (luReorder)="onReorder($event)">
			@for (item of items(); track item) {
				<li cdkDrag [luReorderItemLabel]="item">
					<button type="button" lu-reorder-handle class="button">handle</button>
					{{ item }}
				</li>
			}
		</ul>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SingleListHostComponent {
	readonly items = signal(['A', 'B', 'C']);
	readonly events: ReorderEvent[] = [];
	readonly reorder = viewChild.required(ReorderDirective);
	readonly drags = viewChildren(CdkDrag);

	onReorder(event: ReorderEvent) {
		this.events.push(event);
		const items = [...this.items()];
		moveItemInArray(items, event.previousIndex, event.currentIndex);
		this.items.set(items);
	}
}

@Component({
	selector: 'lu-reorder-connected-lists-test',
	imports: [CdkDropList, CdkDropListGroup, CdkDrag, ReorderDirective, ReorderItemLabelDirective, ReorderHandleComponent],
	template: `
		<div cdkDropListGroup>
			@for (column of columns(); track column.name) {
				<ul
					cdkDropList
					luReorder
					[luReorderLabel]="column.label"
					[cdkDropListData]="column.items"
					[cdkDropListDisabled]="column.disabled"
					[cdkDropListEnterPredicate]="column.closed ? refuseAll : acceptAll"
					(luReorder)="onReorder($event)"
				>
					@for (item of column.items; track item) {
						<li cdkDrag [luReorderItemLabel]="item">
							<button type="button" lu-reorder-handle class="button">handle</button>
							{{ item }}
						</li>
					}
				</ul>
			}
		</div>
		<ul cdkDropList luReorder luReorderLabel="Unrelated">
			<li cdkDrag luReorderItemLabel="Z"><button type="button" lu-reorder-handle class="button">handle</button></li>
		</ul>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConnectedListsHostComponent {
	readonly columns = signal([
		{ name: 'todo', label: 'To do' as string | null, items: ['A', 'B'], disabled: false, closed: false },
		{ name: 'doing', label: 'Doing' as string | null, items: ['C'], disabled: false, closed: false },
		{ name: 'done', label: 'Done' as string | null, items: [] as string[], disabled: false, closed: false },
	]);
	readonly acceptAll = () => true;
	readonly refuseAll = () => false;
	readonly events: ReorderEvent<string[]>[] = [];
	readonly lists = viewChildren(ReorderDirective);
	readonly drags = viewChildren(CdkDrag);

	onReorder(event: ReorderEvent<string[]>) {
		this.events.push(event);
		transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
		this.columns.set([...this.columns()]);
	}
}

describe(ReorderDirective.name, () => {
	let announce: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		announce = vi.fn().mockResolvedValue(undefined);
		TestBed.configureTestingModule({
			providers: [{ provide: LiveAnnouncer, useValue: { announce } }],
		});
	});

	describe('with a single list', () => {
		let fixture: ComponentFixture<SingleListHostComponent>;
		let host: SingleListHostComponent;

		beforeEach(() => {
			fixture = TestBed.createComponent(SingleListHostComponent);
			host = fixture.componentInstance;
			fixture.detectChanges();
		});

		it('should relay a pointer drop as a reorder event', () => {
			// Arrange
			const dropList = host.reorder().dropList;

			// Act
			dropList.dropped.emit({ previousIndex: 0, currentIndex: 2, previousContainer: dropList, container: dropList } as CdkDragDrop<unknown>);

			// Assert
			expect(host.events).toEqual([{ previousIndex: 0, currentIndex: 2, previousContainer: dropList, container: dropList }]);
		});

		it('should list its items in their DOM order', () => {
			// Act
			const items = host.reorder().items();

			// Assert
			expect(items).toEqual(host.drags());
		});

		it('should emit a reorder event when moving an item', () => {
			// Arrange
			const reorder = host.reorder();

			// Act
			reorder.move(host.drags()[0], 2, 'A');

			// Assert
			expect(host.events).toEqual([{ previousIndex: 0, currentIndex: 2, previousContainer: reorder.dropList, container: reorder.dropList }]);
		});

		it('should not emit when moving an item to its current position', () => {
			// Act
			host.reorder().move(host.drags()[1], 1, 'B');

			// Assert
			expect(host.events).toEqual([]);
		});

		it('should focus the moved item handle and announce its new position', async () => {
			// Act
			host.reorder().move(host.drags()[0], 2, 'A');
			fixture.detectChanges();
			await fixture.whenStable();

			// Assert
			const handles = (fixture.nativeElement as HTMLElement).querySelectorAll('[lu-reorder-handle]');
			expect(document.activeElement).toBe(handles[2]);
			expect(announce).toHaveBeenCalledExactlyOnceWith('"A": position 3 of 3');
		});
	});

	describe('with connected lists', () => {
		let fixture: ComponentFixture<ConnectedListsHostComponent>;
		let host: ConnectedListsHostComponent;

		beforeEach(() => {
			fixture = TestBed.createComponent(ConnectedListsHostComponent);
			host = fixture.componentInstance;
			fixture.detectChanges();
		});

		it('should only list the other lists of its group', () => {
			// Arrange
			const [todo, doing, done] = host.lists();

			// Act
			const connectedLists = todo.connectedLists(host.drags()[0]);

			// Assert
			expect(connectedLists).toEqual([doing, done]);
		});

		it('should not list a list whose enter predicate refuses the item', () => {
			// Arrange
			host.columns.update(([todo, doing, done]) => [todo, { ...doing, closed: true }, done]);
			fixture.detectChanges();
			const [todo, , done] = host.lists();

			// Act
			const connectedLists = todo.connectedLists(host.drags()[0]);

			// Assert
			expect(connectedLists).toEqual([done]);
		});

		it('should list a disabled list, as it still receives dragged items', () => {
			// Arrange
			host.columns.update(([todo, doing, done]) => [todo, { ...doing, disabled: true }, done]);
			fixture.detectChanges();
			const [todo, doing, done] = host.lists();

			// Act
			const connectedLists = todo.connectedLists(host.drags()[0]);

			// Assert
			expect(connectedLists).toEqual([doing, done]);
		});

		it('should name a list by its label', () => {
			// Arrange
			const [todo, doing, done] = host.lists();

			// Act
			const label = todo.listLabel(doing, [doing, done]);

			// Assert
			expect(label).toBe('Doing');
		});

		it('should name a list without label by its position and warn once', () => {
			// Arrange
			const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
			host.columns.update(([todo, doing, done]) => [todo, { ...doing, label: null }, { ...done, label: null }]);
			fixture.detectChanges();
			const [todo, doing, done] = host.lists();

			// Act
			const labels = [todo.listLabel(doing, [doing, done]), todo.listLabel(done, [doing, done])];

			// Assert
			expect(labels).toEqual(['List 2', 'List 3']);
			expect(warn).toHaveBeenCalledOnce();
			warn.mockRestore();
		});

		it('should emit the reorder event on the target list when moving an item to another list', () => {
			// Arrange
			const [todo, doing] = host.lists();

			// Act
			todo.move(host.drags()[0], 1, 'A', doing);

			// Assert
			expect(host.events).toEqual([{ previousIndex: 0, currentIndex: 1, previousContainer: todo.dropList, container: doing.dropList }]);
			expect(host.columns().map((column) => column.items)).toEqual([['B'], ['C', 'A'], []]);
		});

		it('should announce the target list after moving an item to another list', async () => {
			// Arrange
			const [todo, doing] = host.lists();

			// Act
			todo.move(host.drags()[0], 1, 'A', doing);
			fixture.detectChanges();
			await fixture.whenStable();

			// Assert
			expect(announce).toHaveBeenCalledExactlyOnceWith('"A": "Doing", position 2 of 2');
		});
	});
});
