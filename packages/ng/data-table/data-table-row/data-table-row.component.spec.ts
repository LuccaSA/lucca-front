import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { DataTableBodyComponent } from '../data-table-body/data-table-body.component';
import { DataTableHeadComponent } from '../data-table-head/data-table-head.component';
import { DataTableComponent } from '../data-table.component';
import { DataTableRowComponent } from './data-table-row.component';

@Component({
	selector: 'lu-data-table-row-test',
	imports: [DataTableComponent, DataTableHeadComponent, DataTableBodyComponent, DataTableRowComponent],
	template: `
		<lu-data-table selectable>
			<thead luDataTableHead>
				<tr luDataTableRow selectedLabel="Select all" [(selected)]="all"></tr>
			</thead>
			<tbody luDataTableBody>
				@for (row of rows; track $index) {
					<tr luDataTableRow [selectedLabel]="'Row ' + $index" [disabled]="$index === disabledIndex()" [(selected)]="row.selected"></tr>
				}
			</tbody>
			<tbody luDataTableBody group="Group" groupButtonAlt="Toggle group" [expanded]="groupExpanded()">
				<tr luDataTableRow selectedLabel="Grouped row" [(selected)]="grouped.selected"></tr>
			</tbody>
			<tbody luDataTableBody>
				<tr luDataTableRow selectedLabel="Last row" [(selected)]="last.selected"></tr>
			</tbody>
		</lu-data-table>
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

describe(DataTableRowComponent.name, () => {
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

	it('should not use the head row as an anchor', () => {
		// Act
		click(0);
		click(2, true);

		// Assert
		expect(host.all()).toBe(true);
		expect(bodyStates()).toEqual([false, true, false, false, false, false]);
	});

	it('should not start a range from a row clicked before the "select all" checkbox', () => {
		// Act
		click(1);
		click(0);
		click(3, true);

		// Assert
		expect(bodyStates()).toEqual([true, false, true, false, false, false]);
		expect(announce).not.toHaveBeenCalled();
	});
});

@Component({
	selector: 'lu-data-table-row-nested-test',
	imports: [DataTableComponent, DataTableHeadComponent, DataTableBodyComponent, DataTableRowComponent],
	template: `
		<lu-data-table>
			<tbody luDataTableBody>
				<tr luDataTableRow>
					<td>
						<lu-data-table selectable>
							<thead luDataTableHead>
								<tr luDataTableRow selectedLabel="Select all" [(selected)]="all"></tr>
							</thead>
							<tbody luDataTableBody>
								@for (row of rows; track $index) {
									<tr luDataTableRow [selectedLabel]="'Row ' + $index" [(selected)]="row.selected"></tr>
								}
							</tbody>
						</lu-data-table>
					</td>
				</tr>
			</tbody>
		</lu-data-table>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class NestedHostComponent {
	readonly all = signal(false);
	readonly rows = Array.from({ length: 3 }, () => ({ selected: signal(false) }));
}

describe('DataTableRowComponent: nested table', () => {
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

	it('should not use the head row of the inner table as an anchor', () => {
		// Act
		click(0);
		click(2, true);

		// Assert
		expect(host.all()).toBe(true);
		expect(host.rows.map((row) => row.selected())).toEqual([false, true, false]);
	});
});
