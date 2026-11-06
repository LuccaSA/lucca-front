import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IndexTableComponent } from '../index-table.component';
import { IndexTableRowCellComponent } from '../index-table-cell/index-table-cell.component';
import { IndexTableRowComponent } from '../index-table-row/index-table-row.component';
import { IndexTableBodyGroupDirective } from './index-table-body-group.directive';
import { IndexTableBodyComponent } from './index-table-body.component';

@Component({
	selector: 'lu-index-table-body-test',
	imports: [IndexTableComponent, IndexTableBodyComponent, IndexTableBodyGroupDirective, IndexTableRowComponent, IndexTableRowCellComponent],
	template: `
		<lu-index-table>
			<tbody luIndexTableBody class="input" group="Input group" groupButtonAlt="Toggle">
				<tr luIndexTableRow>
					<td luIndexTableCell>Cell</td>
				</tr>
			</tbody>
			<tbody luIndexTableBody class="projected" groupButtonAlt="Toggle">
				<span luIndexTableBodyGroup>Projected group</span>
				<tr luIndexTableRow>
					<td luIndexTableCell>Cell</td>
				</tr>
			</tbody>
			<tbody luIndexTableBody class="both" group="Input group" groupButtonAlt="Toggle">
				<span luIndexTableBodyGroup>Projected group</span>
				<tr luIndexTableRow>
					<td luIndexTableCell>Cell</td>
				</tr>
			</tbody>
			<tbody luIndexTableBody class="none">
				<tr luIndexTableRow>
					<td luIndexTableCell>Cell</td>
				</tr>
			</tbody>
		</lu-index-table>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe(IndexTableBodyComponent.name, () => {
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

		it('should render the luIndexTableBodyGroup element in the group row', () => {
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
