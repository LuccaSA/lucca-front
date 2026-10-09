import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Dir } from '@angular/cdk/bidi';
import { CdkDrag, CdkDropList, CdkDropListGroup, DropListOrientation, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ReorderHandleComponent } from './reorder-handle.component';
import { ReorderItemLabelDirective } from './reorder-item-label.directive';
import { ReorderDirective } from './reorder.directive';
import { ReorderEvent, ReorderFlow, ReorderMenuEntry, ReorderOptionalAction } from './reorder.type';

@Component({
	selector: 'lu-reorder-handle-test',
	imports: [CdkDropList, CdkDrag, ReorderDirective, ReorderItemLabelDirective, ReorderHandleComponent],
	template: `
		<ul
			cdkDropList
			luReorder
			[cdkDropListOrientation]="orientation()"
			[luReorderFlow]="flow()"
			[luReorderShortcutsHidden]="shortcutsHidden()"
			[luReorderActionsExcluded]="actionsExcluded()"
			(luReorder)="onReorder($event)"
		>
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
class HostComponent {
	readonly orientation = input<DropListOrientation>('vertical');
	readonly flow = input<ReorderFlow>('row');
	readonly shortcutsHidden = input<boolean | readonly ReorderMenuEntry[]>([]);
	readonly actionsExcluded = input<readonly ReorderOptionalAction[]>([]);
	readonly items = signal(['A', 'B', 'C']);
	readonly events: ReorderEvent[] = [];

	onReorder(event: ReorderEvent) {
		this.events.push(event);
		const items = [...this.items()];
		moveItemInArray(items, event.previousIndex, event.currentIndex);
		this.items.set(items);
	}
}

@Component({
	selector: 'lu-reorder-handle-kanban-test',
	imports: [CdkDropListGroup, CdkDropList, CdkDrag, ReorderDirective, ReorderItemLabelDirective, ReorderHandleComponent],
	template: `
		<div cdkDropListGroup>
			@for (column of columns(); track column.label) {
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
						<li cdkDrag [luReorderItemLabel]="item"><button type="button" lu-reorder-handle class="button">handle</button></li>
					}
				</ul>
			}
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class KanbanHostComponent {
	readonly columns = signal([
		{ label: 'To do', items: ['A', 'B'], disabled: false, closed: false },
		{ label: 'Doing', items: ['C'], disabled: false, closed: false },
		{ label: 'Done', items: ['D'], disabled: false, closed: false },
	]);
	readonly acceptAll = () => true;
	readonly refuseAll = () => false;

	onReorder(event: ReorderEvent<string[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
		}
		this.columns.set([...this.columns()]);
	}
}

@Component({
	selector: 'lu-reorder-handle-rtl-test',
	imports: [Dir, CdkDropList, CdkDrag, ReorderDirective, ReorderItemLabelDirective, ReorderHandleComponent],
	template: `
		<div dir="rtl">
			<ul cdkDropList cdkDropListOrientation="horizontal" luReorder (luReorder)="onReorder($event)">
				@for (item of items(); track item) {
					<li cdkDrag [luReorderItemLabel]="item"><button type="button" lu-reorder-handle class="button">handle</button></li>
				}
			</ul>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class RtlHostComponent {
	readonly items = signal(['A', 'B', 'C']);

	onReorder(event: ReorderEvent) {
		const items = [...this.items()];
		moveItemInArray(items, event.previousIndex, event.currentIndex);
		this.items.set(items);
	}
}

@Component({
	selector: 'lu-reorder-handle-without-label-test',
	imports: [CdkDropList, CdkDrag, ReorderDirective, ReorderHandleComponent],
	template: `
		<ul cdkDropList luReorder>
			<li cdkDrag><button type="button" lu-reorder-handle class="button">handle</button></li>
			<li cdkDrag><button type="button" lu-reorder-handle class="button">handle</button></li>
		</ul>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class WithoutItemLabelHostComponent {}

@Component({
	selector: 'lu-reorder-handle-without-reorder-test',
	imports: [CdkDropList, CdkDrag, ReorderHandleComponent],
	template: `
		<ul cdkDropList>
			<li cdkDrag><button type="button" lu-reorder-handle class="button">handle</button></li>
		</ul>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class WithoutReorderHostComponent {}

function getHandles(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
	return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('[lu-reorder-handle]'));
}

function pressKey(element: HTMLElement, key: string, init: KeyboardEventInit = { altKey: true }): void {
	element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init }));
}

function getMenuActions(): HTMLButtonElement[] {
	return Array.from(document.querySelectorAll<HTMLButtonElement>('.dropdown-list-option-action'));
}

describe(ReorderHandleComponent.name, () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [{ provide: LiveAnnouncer, useValue: { announce: vi.fn().mockResolvedValue(undefined) } }],
		});
	});

	describe('in a luReorder list', () => {
		let fixture: ComponentFixture<HostComponent>;
		let host: HostComponent;

		beforeEach(() => {
			fixture = TestBed.createComponent(HostComponent);
			host = fixture.componentInstance;
			fixture.detectChanges();
		});

		it('should be named after its item', () => {
			// Act
			const [handle] = getHandles(fixture);

			// Assert
			expect(handle.querySelector('.pr-u-mask')?.textContent).toBe('Move "A"');
		});

		it('should be a button', () => {
			// Act
			const [handle] = getHandles(fixture);

			// Assert
			expect(handle.getAttribute('type')).toBe('button');
		});

		it('should declare its keyboard shortcuts', () => {
			// Act
			const [handle] = getHandles(fixture);

			// Assert
			expect(handle.getAttribute('aria-keyshortcuts')).toBe('Alt+ArrowUp Alt+ArrowLeft Alt+ArrowDown Alt+ArrowRight Alt+Home Alt+PageUp Alt+End Alt+PageDown');
		});

		it('should not declare keyboard shortcuts when its item is alone in its list', () => {
			// Arrange
			host.items.set(['A']);
			fixture.detectChanges();

			// Act
			const [handle] = getHandles(fixture);

			// Assert
			expect(handle.hasAttribute('aria-keyshortcuts')).toBe(false);
		});

		it('should move its item down with Alt + ArrowDown', () => {
			// Act
			pressKey(getHandles(fixture)[0], 'ArrowDown');

			// Assert
			expect(host.events.map(({ previousIndex, currentIndex }) => ({ previousIndex, currentIndex }))).toEqual([{ previousIndex: 0, currentIndex: 1 }]);
			expect(host.items()).toEqual(['B', 'A', 'C']);
		});

		it('should also move its item down with Alt + ArrowRight', () => {
			// Act
			pressKey(getHandles(fixture)[0], 'ArrowRight');

			// Assert
			expect(host.items()).toEqual(['B', 'A', 'C']);
		});

		it('should move its item up with Alt + ArrowUp', () => {
			// Act
			pressKey(getHandles(fixture)[2], 'ArrowUp');

			// Assert
			expect(host.items()).toEqual(['A', 'C', 'B']);
		});

		it('should not move the first item up', () => {
			// Act
			pressKey(getHandles(fixture)[0], 'ArrowUp');

			// Assert
			expect(host.events).toEqual([]);
		});

		it('should stop the shortcut propagation, even when the item cannot move', () => {
			// Arrange
			const listener = vi.fn();
			document.addEventListener('keydown', listener);

			// Act
			pressKey(getHandles(fixture)[0], 'ArrowUp');
			pressKey(getHandles(fixture)[0], 'ArrowDown');

			// Assert
			expect(listener).not.toHaveBeenCalled();
			document.removeEventListener('keydown', listener);
		});

		it('should show Fn + up and down arrows for the start and the end of a vertical list on Mac', async () => {
			// Arrange
			const userAgent = vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');
			const macFixture = TestBed.createComponent(HostComponent);
			macFixture.detectChanges();

			// Act
			getHandles(macFixture)[1].click();
			macFixture.detectChanges();

			// Assert
			await vi.waitFor(() => expect(document.querySelectorAll('.dropdown-list-option-action .kbdWrapper').length).toBe(4));
			expect(Array.from(document.querySelectorAll('.dropdown-list-option-action .kbdWrapper')).map((shortcut) => shortcut.textContent?.replace(/\s/g, ''))).toEqual([
				'Option+uparrow',
				'Option+downarrow',
				'Fn+Option+uparrow',
				'Fn+Option+downarrow',
			]);
			userAgent.mockRestore();
		});

		describe('without the first action', () => {
			beforeEach(() => {
				fixture.componentRef.setInput('actionsExcluded', ['first']);
				fixture.detectChanges();
			});

			it('should not offer it in the menu', async () => {
				// Act
				getHandles(fixture)[1].click();
				fixture.detectChanges();

				// Assert
				await vi.waitFor(() => expect(getMenuActions().length).toBe(3));
				expect(getMenuActions().map((action) => action.firstChild?.textContent?.trim())).toEqual(['Move up', 'Move down', 'Move to bottom']);
			});

			it('should neither declare nor perform its shortcuts, but still stop them', () => {
				// Arrange
				const [, , handle] = getHandles(fixture);
				const listener = vi.fn();
				document.addEventListener('keydown', listener);

				// Act
				pressKey(handle, 'Home');

				// Assert
				expect(handle.getAttribute('aria-keyshortcuts')).not.toContain('Alt+Home');
				expect(handle.getAttribute('aria-keyshortcuts')).toContain('Alt+End');
				expect(host.items()).toEqual(['A', 'B', 'C']);
				expect(listener).not.toHaveBeenCalled();
				document.removeEventListener('keydown', listener);
			});
		});

		it('should hide the shortcuts of the given menu entries only', async () => {
			// Arrange
			fixture.componentRef.setInput('shortcutsHidden', ['first', 'last']);
			fixture.detectChanges();

			// Act
			getHandles(fixture)[1].click();
			fixture.detectChanges();

			// Assert
			await vi.waitFor(() => expect(getMenuActions().length).toBe(4));
			expect(getMenuActions().map((action) => action.querySelector('.kbdWrapper') !== null)).toEqual([true, true, false, false]);
		});

		it('should hide every shortcut with true, while keeping them working and declared', async () => {
			// Arrange
			fixture.componentRef.setInput('shortcutsHidden', true);
			fixture.detectChanges();
			const [, handle] = getHandles(fixture);

			// Act
			handle.click();
			fixture.detectChanges();
			await vi.waitFor(() => expect(getMenuActions().length).toBe(4));

			// Assert
			expect(document.querySelectorAll('.dropdown-list-option-action .kbdWrapper').length).toBe(0);
			expect(handle.getAttribute('aria-keyshortcuts')).toContain('Alt+ArrowDown');
			pressKey(getMenuActions()[0], 'ArrowDown');
			expect(host.items()).toEqual(['A', 'C', 'B']);
		});

		it('should move its item to the start with Alt + Home and Alt + PageUp', () => {
			// Act
			pressKey(getHandles(fixture)[2], 'Home');
			const afterHome = host.items();
			pressKey(getHandles(fixture)[2], 'PageUp');

			// Assert
			expect(afterHome).toEqual(['C', 'A', 'B']);
			expect(host.items()).toEqual(['B', 'C', 'A']);
		});

		it('should move its item to the end with Alt + End and Alt + PageDown', () => {
			// Act
			pressKey(getHandles(fixture)[0], 'End');
			const afterEnd = host.items();
			pressKey(getHandles(fixture)[0], 'PageDown');

			// Assert
			expect(afterEnd).toEqual(['B', 'C', 'A']);
			expect(host.items()).toEqual(['C', 'A', 'B']);
		});

		it('should stop Alt + Home on the first item, without moving it', () => {
			// Arrange
			const listener = vi.fn();
			document.addEventListener('keydown', listener);

			// Act
			pressKey(getHandles(fixture)[0], 'Home');

			// Assert
			expect(host.events).toEqual([]);
			expect(listener).not.toHaveBeenCalled();
			document.removeEventListener('keydown', listener);
		});

		it('should not move its item with an arrow key alone', () => {
			// Act
			pressKey(getHandles(fixture)[0], 'ArrowDown', {});

			// Assert
			expect(host.events).toEqual([]);
		});

		it('should open a menu with the offered actions', async () => {
			// Act
			getHandles(fixture)[1].click();
			fixture.detectChanges();

			// Assert
			await vi.waitFor(() => expect(getMenuActions().length).toBe(4));
			expect(getMenuActions().map((action) => action.firstChild?.textContent?.trim())).toEqual(['Move up', 'Move down', 'Move to top', 'Move to bottom']);
		});

		it('should only show the actions its item can perform from its position', async () => {
			// Act
			getHandles(fixture)[0].click();
			fixture.detectChanges();

			// Assert
			await vi.waitFor(() => expect(getMenuActions().length).toBe(2));
			expect(getMenuActions().map((action) => action.firstChild?.textContent?.trim())).toEqual(['Move down', 'Move to bottom']);
			expect(document.querySelectorAll('lu-dropdown-divider').length).toBe(1);
		});

		it('should show the keyboard shortcuts in the menu', async () => {
			// Act
			getHandles(fixture)[1].click();
			fixture.detectChanges();

			// Assert
			await vi.waitFor(() => expect(getMenuActions().length).toBe(4));
			expect(document.querySelectorAll('.dropdown-list-option-action .kbdWrapper').length).toBe(4);
			expect(Array.from(document.querySelectorAll('.dropdown-list-option-action .kbdWrapper')).map((shortcut) => shortcut.textContent?.replace(/\s/g, ''))).toEqual([
				'Alt+uparrow',
				'Alt+downarrow',
				'Alt+PageUp',
				'Alt+PageDown',
			]);
		});

		describe('in a horizontal list', () => {
			beforeEach(() => {
				fixture.componentRef.setInput('orientation', 'horizontal');
				fixture.detectChanges();
			});

			it('should declare left and right keyboard shortcuts', () => {
				// Act
				const [handle] = getHandles(fixture);

				// Assert
				expect(handle.getAttribute('aria-keyshortcuts')).toBe('Alt+ArrowLeft Alt+ArrowUp Alt+ArrowRight Alt+ArrowDown Alt+Home Alt+PageUp Alt+End Alt+PageDown');
			});

			it('should move its item with Alt + ArrowRight', () => {
				// Act
				pressKey(getHandles(fixture)[0], 'ArrowRight');

				// Assert
				expect(host.items()).toEqual(['B', 'A', 'C']);
			});

			it('should also move its item with Alt + ArrowDown', () => {
				// Act
				pressKey(getHandles(fixture)[0], 'ArrowDown');

				// Assert
				expect(host.items()).toEqual(['B', 'A', 'C']);
			});

			it('should neither move its item nor stop the propagation of Alt + ArrowDown in a mixed list', () => {
				// Arrange
				fixture.componentRef.setInput('orientation', 'mixed');
				fixture.detectChanges();
				const listener = vi.fn();
				document.addEventListener('keydown', listener);

				// Act
				pressKey(getHandles(fixture)[0], 'ArrowDown');

				// Assert
				expect(host.events).toEqual([]);
				expect(listener).toHaveBeenCalledOnce();
				document.removeEventListener('keydown', listener);
			});

			describe('in a mixed list flowing along columns', () => {
				beforeEach(() => {
					fixture.componentRef.setInput('orientation', 'mixed');
					fixture.componentRef.setInput('flow', 'column');
					fixture.detectChanges();
				});

				it('should declare up and down keyboard shortcuts only', () => {
					// Act
					const [handle] = getHandles(fixture);

					// Assert
					expect(handle.getAttribute('aria-keyshortcuts')).toBe('Alt+ArrowUp Alt+ArrowDown Alt+Home Alt+PageUp Alt+End Alt+PageDown');
				});

				it('should move its item with Alt + ArrowDown, but leave Alt + ArrowRight to the page', () => {
					// Arrange
					const listener = vi.fn();
					document.addEventListener('keydown', listener);

					// Act
					pressKey(getHandles(fixture)[0], 'ArrowDown');
					pressKey(getHandles(fixture)[0], 'ArrowRight');

					// Assert
					expect(host.items()).toEqual(['B', 'A', 'C']);
					expect(listener).toHaveBeenCalledOnce();
					document.removeEventListener('keydown', listener);
				});

				it('should label its menu actions vertically', async () => {
					// Act
					getHandles(fixture)[1].click();
					fixture.detectChanges();

					// Assert
					await vi.waitFor(() => expect(getMenuActions().length).toBe(4));
					expect(getMenuActions().map((action) => action.firstChild?.textContent?.trim())).toEqual(['Move up', 'Move down', 'Move to top', 'Move to bottom']);
				});
			});

			it('should label its menu actions horizontally, with left and right shortcuts', async () => {
				// Act
				getHandles(fixture)[1].click();
				fixture.detectChanges();

				// Assert
				await vi.waitFor(() => expect(getMenuActions().length).toBe(4));
				expect(getMenuActions().map((action) => action.firstChild?.textContent?.trim())).toEqual(['Move left', 'Move right', 'Move to start', 'Move to end']);
				expect(Array.from(document.querySelectorAll('.dropdown-list-option-action .kbd .pr-u-mask')).map((alt) => alt.textContent)).toEqual(['left arrow', 'right arrow']);
			});
		});

		it('should be disabled and not open an empty menu when its item is alone in its list', async () => {
			// Arrange
			host.items.set(['A']);
			fixture.detectChanges();
			const [handle] = getHandles(fixture);
			expect(handle.getAttribute('aria-disabled')).toBe('true');

			// Act
			handle.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
			handle.click();
			fixture.detectChanges();
			await new Promise((resolve) => setTimeout(resolve, 300));

			// Assert
			expect(document.querySelector('.dropdown')).toBeNull();
		});

		describe('with the menu open', () => {
			beforeEach(async () => {
				getHandles(fixture)[1].click();
				fixture.detectChanges();
				await vi.waitFor(() => expect(getMenuActions().length).toBe(4));
			});

			it('should move its item with a shortcut typed on a menu entry, then close the menu', async () => {
				// Act
				pressKey(getMenuActions()[2], 'ArrowDown');
				fixture.detectChanges();

				// Assert
				expect(host.items()).toEqual(['A', 'C', 'B']);
				await vi.waitFor(() => expect(getMenuActions().length).toBe(0));
			});

			it('should stop a shortcut typed on a menu entry, and keep the menu open, when its item cannot move', async () => {
				// Arrange
				pressKey(getMenuActions()[0], 'Home');
				fixture.detectChanges();
				await vi.waitFor(() => expect(getMenuActions().length).toBe(0));
				getHandles(fixture)[0].click();
				fixture.detectChanges();
				await vi.waitFor(() => expect(getMenuActions().length).toBe(2));
				const listener = vi.fn();
				document.addEventListener('keydown', listener);

				// Act
				pressKey(getMenuActions()[0], 'ArrowLeft');
				fixture.detectChanges();

				// Assert
				expect(host.items()).toEqual(['B', 'A', 'C']);
				expect(listener).not.toHaveBeenCalled();
				expect(getMenuActions().length).toBe(2);
				document.removeEventListener('keydown', listener);
			});

			it('should ignore a key typed on a menu entry without Alt', () => {
				// Act
				pressKey(getMenuActions()[0], 'ArrowDown', {});

				// Assert
				expect(host.items()).toEqual(['A', 'B', 'C']);
				expect(getMenuActions().length).toBe(4);
			});
		});

		it('should move its item from the menu', async () => {
			// Arrange
			getHandles(fixture)[0].click();
			fixture.detectChanges();
			await vi.waitFor(() => expect(getMenuActions().length).toBe(2));

			// Act
			getMenuActions()[1].click();

			// Assert
			expect(host.items()).toEqual(['B', 'C', 'A']);
		});
	});

	describe('in connected vertical lists', () => {
		let fixture: ComponentFixture<KanbanHostComponent>;

		beforeEach(() => {
			fixture = TestBed.createComponent(KanbanHostComponent);
			fixture.detectChanges();
		});

		function getItems(): string[][] {
			return fixture.componentInstance.columns().map((column) => column.items);
		}

		it('should declare up and down within the list, and right to the next list', () => {
			// Act
			const [handle] = getHandles(fixture);

			// Assert
			expect(handle.getAttribute('aria-keyshortcuts')).toBe('Alt+ArrowUp Alt+ArrowDown Alt+ArrowRight Alt+PageUp Alt+PageDown Alt+End');
		});

		it('should move its item down within its list with Alt + ArrowDown', () => {
			// Act
			pressKey(getHandles(fixture)[0], 'ArrowDown');

			// Assert
			expect(getItems()).toEqual([['B', 'A'], ['C'], ['D']]);
		});

		it('should move its item to the same position of the next list with Alt + ArrowRight', () => {
			// Act
			pressKey(getHandles(fixture)[1], 'ArrowRight');

			// Assert
			expect(getItems()).toEqual([['A'], ['C', 'B'], ['D']]);
		});

		it('should move its item to the previous list with Alt + ArrowLeft', () => {
			// Act
			pressKey(getHandles(fixture)[2], 'ArrowLeft');

			// Assert
			expect(getItems()).toEqual([['C', 'A', 'B'], [], ['D']]);
		});

		it('should skip a list that cannot receive the item', () => {
			// Arrange
			fixture.componentInstance.columns.update(([todo, doing, done]) => [todo, { ...doing, closed: true }, done]);
			fixture.detectChanges();

			// Act
			pressKey(getHandles(fixture)[0], 'ArrowRight');

			// Assert
			expect(getItems()).toEqual([['B'], ['C'], ['A', 'D']]);
		});

		it('should not skip a disabled list, as it still receives dragged items', () => {
			// Arrange
			fixture.componentInstance.columns.update(([todo, doing, done]) => [todo, { ...doing, disabled: true }, done]);
			fixture.detectChanges();

			// Act
			pressKey(getHandles(fixture)[0], 'ArrowRight');

			// Assert
			expect(getItems()).toEqual([['B'], ['A', 'C'], ['D']]);
		});

		it('should be disabled, yet focusable, when its item is alone and no other list accepts it', () => {
			// Arrange
			fixture.componentInstance.columns.update(([todo, doing, done]) => [{ ...todo, closed: true }, { ...doing, closed: true }, done]);

			// Act
			fixture.detectChanges();

			// Assert
			const handles = getHandles(fixture);
			expect(handles[3].getAttribute('aria-disabled')).toBe('true');
			expect(handles[3].disabled).toBe(false);
			expect(handles.slice(0, 3).map((handle) => handle.hasAttribute('aria-disabled'))).toEqual([false, false, false]);
		});

		it('should be disabled when its item cannot be dragged', () => {
			// Arrange
			fixture.componentInstance.columns.update(([todo, doing, done]) => [todo, { ...doing, disabled: true }, done]);

			// Act
			fixture.detectChanges();

			// Assert
			expect(getHandles(fixture).map((handle) => handle.getAttribute('aria-disabled'))).toEqual([null, null, 'true', null]);
		});

		it('should neither move an item that cannot be dragged nor open its menu', async () => {
			// Arrange
			fixture.componentInstance.columns.update(([todo, doing, done]) => [todo, { ...doing, disabled: true }, done]);
			fixture.detectChanges();
			const handle = getHandles(fixture)[2];
			const listener = vi.fn();
			document.addEventListener('keydown', listener);

			// Act
			pressKey(handle, 'ArrowLeft');
			handle.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
			handle.click();
			fixture.detectChanges();
			await new Promise((resolve) => setTimeout(resolve, 300));

			// Assert
			expect(getItems()).toEqual([['A', 'B'], ['C'], ['D']]);
			expect(handle.hasAttribute('aria-keyshortcuts')).toBe(false);
			expect(listener).toHaveBeenCalledOnce();
			expect(document.querySelector('.dropdown')).toBeNull();
			document.removeEventListener('keydown', listener);
		});

		it('should move its item to the same position of the last list with Alt + End', () => {
			// Act
			pressKey(getHandles(fixture)[0], 'End');

			// Assert
			expect(getItems()).toEqual([['B'], ['C'], ['A', 'D']]);
		});

		it('should move its item to the first list with Alt + Home', () => {
			// Act
			pressKey(getHandles(fixture)[3], 'Home');

			// Assert
			expect(getItems()).toEqual([['D', 'A', 'B'], ['C'], []]);
		});

		it('should move its item to the end of its list with Alt + PageDown', () => {
			// Act
			pressKey(getHandles(fixture)[0], 'PageDown');

			// Assert
			expect(getItems()).toEqual([['B', 'A'], ['C'], ['D']]);
		});

		it('should skip the last list when it cannot receive the item', () => {
			// Arrange
			fixture.componentInstance.columns.update(([todo, doing, done]) => [todo, doing, { ...done, closed: true }]);
			fixture.detectChanges();

			// Act
			pressKey(getHandles(fixture)[0], 'End');

			// Assert
			expect(getItems()).toEqual([['B'], ['A', 'C'], ['D']]);
		});

		it('should stop Alt + Home in the first list, without moving its item', () => {
			// Arrange
			const listener = vi.fn();
			document.addEventListener('keydown', listener);

			// Act
			pressKey(getHandles(fixture)[0], 'Home');

			// Assert
			expect(getItems()).toEqual([['A', 'B'], ['C'], ['D']]);
			expect(listener).not.toHaveBeenCalled();
			document.removeEventListener('keydown', listener);
		});

		it('should stop Alt + ArrowLeft in the first list, without moving its item', () => {
			// Arrange
			const listener = vi.fn();
			document.addEventListener('keydown', listener);

			// Act
			pressKey(getHandles(fixture)[0], 'ArrowLeft');

			// Assert
			expect(getItems()).toEqual([['A', 'B'], ['C'], ['D']]);
			expect(listener).not.toHaveBeenCalled();
			document.removeEventListener('keydown', listener);
		});

		it('should move an item out of a list that was empty, back to the previous list', async () => {
			// Arrange
			fixture.componentInstance.columns.update(([todo, doing]) => [todo, doing, { label: 'Done', items: [], disabled: false, closed: false }]);
			fixture.detectChanges();
			pressKey(getHandles(fixture)[2], 'ArrowRight');
			fixture.detectChanges();
			await fixture.whenStable();

			// Act
			pressKey(getHandles(fixture)[2], 'ArrowLeft');

			// Assert
			expect(getItems()).toEqual([['A', 'B'], ['C'], []]);
		});

		it('should show the shortcut of the next list in the menu', async () => {
			// Act
			getHandles(fixture)[0].click();
			fixture.detectChanges();

			// Assert
			await vi.waitFor(() => expect(getMenuActions().length).toBe(4));
			const listActions = getMenuActions().slice(2);
			expect(listActions.map((action) => action.querySelector('.kbdWrapper')?.textContent?.replace(/\s/g, '') ?? null)).toEqual(['Alt+rightarrow', 'Alt+End']);
		});
	});

	it('should swap left and right in a right-to-left horizontal list', () => {
		// Arrange
		const fixture = TestBed.createComponent(RtlHostComponent);
		fixture.detectChanges();
		const [handle] = getHandles(fixture);

		// Act
		pressKey(handle, 'ArrowLeft');

		// Assert
		expect(handle.getAttribute('aria-keyshortcuts')).toBe('Alt+ArrowRight Alt+ArrowUp Alt+ArrowLeft Alt+ArrowDown Alt+Home Alt+PageUp Alt+End Alt+PageDown');
		expect(fixture.componentInstance.items()).toEqual(['B', 'A', 'C']);
	});

	it('should warn once and be named "Move" when its item has no label', () => {
		// Arrange
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		const fixture = TestBed.createComponent(WithoutItemLabelHostComponent);

		// Act
		fixture.detectChanges();

		// Assert
		expect(getHandles(fixture).map((handle) => handle.querySelector('.pr-u-mask')?.textContent)).toEqual(['Move', 'Move']);
		expect(warn).toHaveBeenCalledOnce();
		warn.mockRestore();
	});

	it('should warn and offer neither menu nor shortcuts outside a luReorder list', async () => {
		// Arrange
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		const fixture = TestBed.createComponent(WithoutReorderHostComponent);
		fixture.detectChanges();
		const [handle] = getHandles(fixture);

		// Act
		handle.click();
		fixture.detectChanges();
		await fixture.whenStable();

		// Assert
		expect(warn).toHaveBeenCalledOnce();
		expect(handle.hasAttribute('aria-keyshortcuts')).toBe(false);
		expect(getMenuActions()).toEqual([]);
		warn.mockRestore();
	});
});
