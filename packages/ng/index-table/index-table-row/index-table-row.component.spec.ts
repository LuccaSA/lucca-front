import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { IndexTableBodyComponent } from '../index-table-body/index-table-body.component';
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
		expect(announce).toHaveBeenCalledExactlyOnceWith('3 items selected', 'polite');
	});

	it('should only toggle the clicked row without Shift', () => {
		// Act
		click(1);
		click(3);

		// Assert
		expect(bodyStates()).toEqual([true, false, true, false, false, false]);
		expect(announce).not.toHaveBeenCalled();
	});

	it('should unselect the range when the Shift + clicked row gets unchecked', () => {
		// Arrange
		host.rows.forEach((row) => row.selected.set(true));
		fixture.detectChanges();

		// Act
		click(4);
		click(2, true);

		// Assert
		expect(bodyStates()).toEqual([true, false, false, false, false, false]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('3 items unselected', 'polite');
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
});
