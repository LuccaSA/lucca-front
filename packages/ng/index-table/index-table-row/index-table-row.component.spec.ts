import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { IndexTableBodyComponent } from '../index-table-body/index-table-body.component';
import { IndexTableBodyGroupDirective } from '../index-table-body/index-table-body-group.directive';
import { IndexTableHeadComponent } from '../index-table-head/index-table-head.component';
import { IndexTableComponent } from '../index-table.component';
import { IndexTableRowComponent } from './index-table-row.component';

@Component({
	selector: 'lu-index-table-row-test',
	imports: [IndexTableComponent, IndexTableHeadComponent, IndexTableBodyComponent, IndexTableRowComponent],
	template: `
		<lu-index-table selectable>
			<thead luIndexTableHead>
				<tr luIndexTableRow selectedLabel="Select all" [(selected)]="all"></tr>
			</thead>
			<tbody luIndexTableBody>
				@for (row of rows; track $index) {
					<tr luIndexTableRow [selectedLabel]="'Row ' + $index" [disabled]="$index === disabledIndex()" [(selected)]="row.selected"></tr>
				}
			</tbody>
			<tbody luIndexTableBody group="Group" groupButtonAlt="Toggle group" [expanded]="groupExpanded()">
				<tr luIndexTableRow selectedLabel="Grouped row" [(selected)]="grouped.selected"></tr>
			</tbody>
			<tbody luIndexTableBody>
				<tr luIndexTableRow selectedLabel="Last row" [(selected)]="last.selected"></tr>
			</tbody>
		</lu-index-table>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	readonly all = signal(false);
	readonly rows = Array.from({ length: 4 }, () => ({ selected: signal(false) }));
	readonly grouped = { selected: signal(false) };
	readonly last = { selected: signal(false) };
	readonly disabledIndex = signal(-1);
	readonly groupExpanded = signal(true);
}

describe(IndexTableRowComponent.name, () => {
	let fixture: ComponentFixture<HostComponent>;
	let host: HostComponent;
	let announce: ReturnType<typeof vi.fn>;

	function checkboxes(): HTMLInputElement[] {
		return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>('input[type="checkbox"]'));
	}

	/** Index 0 is the "select all" checkbox of the head row */
	function click(index: number, shiftKey = false) {
		// The browser toggles the checkbox and then dispatches `input` and `change`
		checkboxes()[index].dispatchEvent(new MouseEvent('click', { bubbles: true, shiftKey }));
		fixture.detectChanges();
	}

	function bodyStates() {
		return [...host.rows.map((row) => row.selected()), host.grouped.selected(), host.last.selected()];
	}

	beforeEach(async () => {
		announce = vi.fn().mockResolvedValue(undefined);
		TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [{ provide: LiveAnnouncer, useValue: { announce } }],
		});
		fixture = TestBed.createComponent(HostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
		// ngModel writes its initial value asynchronously
		await fixture.whenStable();
	});

	it('should select the rows between the anchor and the Shift + clicked row', () => {
		// Act
		click(1);
		click(3, true);

		// Assert
		expect(bodyStates()).toEqual([true, true, true, false, false, false]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('You just selected 2 items', 'polite');
	});

	it('should only toggle the clicked row without Shift', () => {
		// Act
		click(1);
		click(3);

		// Assert
		expect(bodyStates()).toEqual([true, false, true, false, false, false]);
		expect(announce).not.toHaveBeenCalled();
	});

	it('should unselect the range when the Shift + clicked row gets unchecked', async () => {
		// Arrange
		host.rows.forEach((row) => row.selected.set(true));
		fixture.detectChanges();
		await fixture.whenStable();

		// Act
		click(4);
		click(2, true);

		// Assert
		expect(bodyStates()).toEqual([true, false, false, false, false, false]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('You just unselected 2 items', 'polite');
	});

	it('should leave disabled rows unchanged', () => {
		// Arrange
		host.disabledIndex.set(1);
		fixture.detectChanges();

		// Act
		click(1);
		click(4, true);

		// Assert
		expect(bodyStates()).toEqual([true, false, true, true, false, false]);
	});

	it('should leave the rows of a collapsed group unchanged', () => {
		// Arrange
		host.groupExpanded.set(false);
		fixture.detectChanges();

		// Act
		click(1);
		click(6, true);

		// Assert
		expect(bodyStates()).toEqual([true, true, true, true, false, true]);
	});

	it('should include the rows of an expanded group', () => {
		// Act
		click(1);
		click(6, true);

		// Assert
		expect(bodyStates()).toEqual([true, true, true, true, true, true]);
	});

	it('should start a range from the first row after a click on the head row', () => {
		// Act
		click(0);
		click(2, true);

		// Assert
		expect(host.all()).toBe(true);
		expect(bodyStates()).toEqual([true, true, false, false, false, false]);
	});

	it('should preview on the checkboxes the rows a Shift + click on the hovered row would change, while Shift is held', () => {
		// Arrange
		click(2);
		const rows = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr'));
		// Indexes of the rows whose checkbox previews a selection
		const previewed = () => rows.flatMap((row, index) => (row.classList.contains('is-rangeWillCheck') ? [index] : []));
		rows[3].querySelector('lu-checkbox-input')?.closest('td, th')?.dispatchEvent(new PointerEvent('pointerenter'));

		// Act
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift', shiftKey: true }));
		fixture.detectChanges();
		const whileShiftHeld = previewed();
		document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Shift', shiftKey: false }));
		fixture.detectChanges();

		// Assert
		expect(whileShiftHeld).toEqual([2, 3]);
		expect(previewed()).toEqual([]);
		expect((fixture.nativeElement as HTMLElement).querySelector('.is-rangeWillUncheck')).toBeNull();
	});

	it('should start a range from the first row after the "select all" checkbox, not from a row clicked before it', () => {
		// Act
		click(2);
		click(0);
		click(3, true);

		// Assert
		expect(bodyStates()).toEqual([true, true, true, false, false, false]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('You just selected 2 items', 'polite');
	});
});

@Component({
	selector: 'lu-index-table-row-nested-test',
	imports: [IndexTableComponent, IndexTableHeadComponent, IndexTableBodyComponent, IndexTableRowComponent],
	template: `
		<lu-index-table>
			<tbody luIndexTableBody>
				<tr luIndexTableRow>
					<td>
						<lu-index-table selectable>
							<thead luIndexTableHead>
								<tr luIndexTableRow selectedLabel="Select all" [(selected)]="all"></tr>
							</thead>
							<tbody luIndexTableBody>
								@for (row of rows; track $index) {
									<tr luIndexTableRow [selectedLabel]="'Row ' + $index" [(selected)]="row.selected"></tr>
								}
							</tbody>
						</lu-index-table>
					</td>
				</tr>
			</tbody>
		</lu-index-table>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class NestedHostComponent {
	readonly all = signal(false);
	readonly rows = Array.from({ length: 3 }, () => ({ selected: signal(false) }));
}

describe('IndexTableRowComponent: nested table', () => {
	let fixture: ComponentFixture<NestedHostComponent>;
	let host: NestedHostComponent;

	function click(index: number, shiftKey = false) {
		const checkboxes = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
		checkboxes[index].dispatchEvent(new MouseEvent('click', { bubbles: true, shiftKey }));
		fixture.detectChanges();
	}

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [NestedHostComponent],
			providers: [{ provide: LiveAnnouncer, useValue: { announce: vi.fn().mockResolvedValue(undefined) } }],
		});
		fixture = TestBed.createComponent(NestedHostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
		await fixture.whenStable();
	});

	it('should start a range from the first row of the inner table after a click on its head row', () => {
		// Act
		click(0);
		click(2, true);

		// Assert
		expect(host.all()).toBe(true);
		expect(host.rows.map((row) => row.selected())).toEqual([true, true, false]);
	});
});

@Component({
	selector: 'lu-index-table-row-group-slot-test',
	imports: [IndexTableComponent, IndexTableBodyComponent, IndexTableBodyGroupDirective, IndexTableRowComponent],
	template: `
		<lu-index-table selectable>
			<tbody luIndexTableBody>
				<tr luIndexTableRow selectedLabel="First row" [(selected)]="first"></tr>
			</tbody>
			<tbody luIndexTableBody groupButtonAlt="Toggle group">
				<ng-container luIndexTableBodyGroup>Group</ng-container>
				<tr luIndexTableRow selectedLabel="Grouped row" [(selected)]="grouped"></tr>
			</tbody>
			<tbody luIndexTableBody>
				<tr luIndexTableRow selectedLabel="Last row" [(selected)]="last"></tr>
			</tbody>
		</lu-index-table>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class GroupSlotHostComponent {
	readonly first = signal(false);
	readonly grouped = signal(false);
	readonly last = signal(false);
}

describe('IndexTableRowComponent: group projected with luIndexTableBodyGroup', () => {
	let fixture: ComponentFixture<GroupSlotHostComponent>;
	let host: GroupSlotHostComponent;

	function click(index: number, shiftKey = false) {
		const checkboxes = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
		checkboxes[index].dispatchEvent(new MouseEvent('click', { bubbles: true, shiftKey }));
		fixture.detectChanges();
	}

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [GroupSlotHostComponent],
			providers: [{ provide: LiveAnnouncer, useValue: { announce: vi.fn().mockResolvedValue(undefined) } }],
		});
		fixture = TestBed.createComponent(GroupSlotHostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
		await fixture.whenStable();
	});

	it('should leave the rows of a collapsed group unchanged', () => {
		// Act
		click(0);
		click(2, true);

		// Assert
		expect([host.first(), host.grouped(), host.last()]).toEqual([true, false, true]);
	});
});

@Component({
	selector: 'lu-index-table-row-auto-select-all-test',
	imports: [IndexTableComponent, IndexTableHeadComponent, IndexTableBodyComponent, IndexTableRowComponent],
	template: `
		<lu-index-table selectable>
			<thead luIndexTableHead>
				<tr luIndexTableRow selectedLabel="Select all" autoSelectAllOnPage [(selected)]="all" (selectedChange)="headChanges = headChanges + 1"></tr>
			</thead>
			<tbody luIndexTableBody>
				@for (row of rows; track $index) {
					<tr luIndexTableRow [selectedLabel]="'Row ' + $index" [disabled]="disabledRows().includes($index)" [(selected)]="row.selected"></tr>
				}
			</tbody>
		</lu-index-table>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoSelectAllHostComponent {
	readonly all = signal(false);
	headChanges = 0;
	readonly disabledRows = signal([1]);
	readonly rows = Array.from({ length: 4 }, () => ({ selected: signal(false) }));
}

describe('IndexTableRowComponent: autoSelectAllOnPage', () => {
	let fixture: ComponentFixture<AutoSelectAllHostComponent>;
	let host: AutoSelectAllHostComponent;

	function checkboxes(): HTMLInputElement[] {
		return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>('input[type="checkbox"]'));
	}

	/** Index 0 is the "select all" checkbox of the head row, row 1 is disabled */
	async function click(index: number, shiftKey = false) {
		checkboxes()[index].dispatchEvent(new MouseEvent('click', { bubbles: true, shiftKey }));
		fixture.detectChanges();
		// ngModel writes the new states asynchronously
		await fixture.whenStable();
		fixture.detectChanges();
	}

	function rowStates() {
		return host.rows.map((row) => row.selected());
	}

	function headCheckbox() {
		return checkboxes()[0];
	}

	/** State shown by the "select all" checkbox */
	function headState() {
		return headCheckbox().getAttribute('aria-checked') === 'mixed' ? 'mixed' : headCheckbox().checked;
	}

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [AutoSelectAllHostComponent],
			providers: [{ provide: LiveAnnouncer, useValue: { announce: vi.fn().mockResolvedValue(undefined) } }],
		});
		fixture = TestBed.createComponent(AutoSelectAllHostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
		await fixture.whenStable();
	});

	it('should select and unselect the enabled rows of the page', async () => {
		// Act
		await click(0);
		const selected = [rowStates(), headState()];
		await click(0);

		// Assert
		expect(selected).toEqual([[true, false, true, true], 'mixed']);
		expect(rowStates()).toEqual([false, false, false, false]);
		expect(headState()).toBe(false);
	});

	it('should follow all the rows of the page, disabled rows included', async () => {
		// Act
		await click(1);
		const mixed = headState();
		host.rows[1].selected.set(true);
		await click(3);
		await click(4);

		// Assert
		expect(mixed).toBe('mixed');
		expect(headState()).toBe(true);
	});

	it('should unselect the enabled rows when they are all selected, even if the checkbox is mixed', async () => {
		// Arrange
		await click(1);
		await click(3);
		await click(4);

		// Act
		const before = headState();
		await click(0);

		// Assert
		expect(before).toBe('mixed');
		expect(rowStates()).toEqual([false, false, false, false]);
		expect(headState()).toBe(false);
	});

	it('should select the enabled rows when a disabled row is selected', async () => {
		// Arrange
		host.rows[1].selected.set(true);
		fixture.detectChanges();

		// Act
		await click(0);

		// Assert
		expect(rowStates()).toEqual([true, true, true, true]);
		expect(headState()).toBe(true);
	});

	it('should disable the checkbox when no row of the page is enabled', async () => {
		// Arrange
		host.rows[1].selected.set(true);

		// Act
		host.disabledRows.set([0, 1, 2, 3]);
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();

		// Assert
		expect(headCheckbox().disabled).toBe(true);
		expect(headState()).toBe('mixed');
	});

	it('should neither write nor emit the selected state of the head row', async () => {
		// Act
		await click(0);
		await click(1);

		// Assert
		expect(host.all()).toBe(false);
		expect(host.headChanges).toBe(0);
	});

	it('should unselect the first rows with "select all" then Shift + click', async () => {
		// Act
		await click(0);
		await click(3, true);

		// Assert
		expect(rowStates()).toEqual([false, false, false, true]);
		expect(headState()).toBe('mixed');
	});

	it('should preview the state of the "select all" checkbox while Shift is held', async () => {
		// Arrange
		host.rows[1].selected.set(true);
		await click(1);
		const head = (fixture.nativeElement as HTMLElement).querySelector('thead tr');
		const rows = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr'));

		// Act
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift', shiftKey: true }));
		rows[3].querySelector('lu-checkbox-input')?.closest('td, th')?.dispatchEvent(new PointerEvent('pointerenter'));
		fixture.detectChanges();
		const preview = [head?.classList.contains('is-rangeWillMix'), head?.classList.contains('is-rangeWillCheck'), rows.map((row) => row.classList.contains('is-rangeWillCheck'))];
		document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Shift', shiftKey: false }));

		// Assert
		expect(preview).toEqual([false, true, [false, false, true, true]]);
	});
});
