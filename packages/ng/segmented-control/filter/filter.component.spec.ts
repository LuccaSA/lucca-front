import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SegmentedControlComponent } from '../segmented-control.component';
import { SegmentedControlFilterLabelDirective } from './filter-label.directive';
import { SegmentedControlFilterComponent } from './filter.component';

@Component({
	selector: 'lu-segmented-control-filter-test',
	imports: [SegmentedControlComponent, SegmentedControlFilterComponent, SegmentedControlFilterLabelDirective, ReactiveFormsModule],
	template: `
		<lu-segmented-control [formControl]="control">
			<lu-segmented-control-filter class="input" label="Input" value="input" />
			<lu-segmented-control-filter class="projected" value="projected">
				<ng-container luSegmentedControlFilterLabel>Projected <strong>label</strong></ng-container>
			</lu-segmented-control-filter>
			<lu-segmented-control-filter class="both" label="Input" value="both">
				<ng-container luSegmentedControlFilterLabel>Projected label</ng-container>
			</lu-segmented-control-filter>
		</lu-segmented-control>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	control = new FormControl('input');
}

describe(SegmentedControlFilterComponent.name, () => {
	let element: HTMLElement;

	const label = (selector: string) => element.querySelector(`lu-segmented-control-filter.${selector} label`);
	const text = (node: Element | null) => node?.textContent?.replace(/\s+/g, ' ').trim();

	beforeEach(() => {
		const fixture = TestBed.createComponent(HostComponent);
		element = fixture.nativeElement as HTMLElement;
		fixture.detectChanges();
	});

	describe('label', () => {
		it('should render the label input', () => {
			expect(text(label('input'))).toBe('Input');
		});

		it('should render the luSegmentedControlFilterLabel element in the label', () => {
			expect(text(label('projected'))).toBe('Projected label');
			expect(label('projected')?.querySelector('strong')).not.toBeNull();
		});

		it('should give the label input priority over the projected element', () => {
			expect(text(label('both'))).toBe('Input');
			expect(element.querySelector('lu-segmented-control-filter.both')?.textContent).not.toContain('Projected');
		});
	});
});
