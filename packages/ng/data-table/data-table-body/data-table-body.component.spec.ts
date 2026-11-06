import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DataTableComponent } from '../data-table.component';
import { DataTableRowCellComponent } from '../data-table-cell/data-table-cell.component';
import { DataTableRowComponent } from '../data-table-row/data-table-row.component';
import { DataTableBodyGroupDirective } from './data-table-body-group.directive';
import { DataTableBodyComponent } from './data-table-body.component';

@Component({
	selector: 'lu-data-table-body-test',
	imports: [DataTableComponent, DataTableBodyComponent, DataTableBodyGroupDirective, DataTableRowComponent, DataTableRowCellComponent],
	template: `
		<lu-data-table>
			<tbody luDataTableBody class="input" group="Input group" groupButtonAlt="Toggle">
				<tr luDataTableRow>
					<td luDataTableCell>Cell</td>
				</tr>
			</tbody>
			<tbody luDataTableBody class="projected" groupButtonAlt="Toggle">
				<span luDataTableBodyGroup>Projected group</span>
				<tr luDataTableRow>
					<td luDataTableCell>Cell</td>
				</tr>
			</tbody>
			<tbody luDataTableBody class="both" group="Input group" groupButtonAlt="Toggle">
				<span luDataTableBodyGroup>Projected group</span>
				<tr luDataTableRow>
					<td luDataTableCell>Cell</td>
				</tr>
			</tbody>
			<tbody luDataTableBody class="none">
				<tr luDataTableRow>
					<td luDataTableCell>Cell</td>
				</tr>
			</tbody>
		</lu-data-table>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe(DataTableBodyComponent.name, () => {
	let element: HTMLElement;

	// The group row also holds the toggle button, whose icon renders its alternative text.
	const group = (selector: string) => element.querySelector(`tbody.${selector} > .mod-group`)?.textContent?.replace('Toggle', '').trim();

	beforeEach(() => {
		const fixture = TestBed.createComponent(HostComponent);
		element = fixture.nativeElement as HTMLElement;
		fixture.detectChanges();
	});

	describe('group', () => {
		it('should render the group input', () => {
			expect(group('input')).toBe('Input group');
		});

		it('should render the luDataTableBodyGroup element in the group row', () => {
			expect(group('projected')).toBe('Projected group');
		});

		it('should give the group input priority over the projected element', () => {
			expect(group('both')).toBe('Input group');
			expect(element.querySelector('tbody.both')?.textContent).not.toContain('Projected');
		});

		it('should not render a group row without group', () => {
			expect(element.querySelector('tbody.none > .mod-group')).toBeNull();
		});
	});
});
