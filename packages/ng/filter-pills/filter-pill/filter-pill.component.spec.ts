import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FILTER_PILL_INPUT_COMPONENT, FilterPillInputComponent } from '../core';
import { FilterPillComponent } from './filter-pill.component';

@Component({
	selector: 'lu-test-filter-pill-input',
	template: ``,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: FILTER_PILL_INPUT_COMPONENT,
			useExisting: forwardRef(() => TestFilterPillInputComponent),
		},
	],
})
class TestFilterPillInputComponent implements FilterPillInputComponent {
	// The pill projects its content inside the popover overlay, so the stub only instantiates
	// once the popover opens — expose the instance for the assertions
	static lastInstance: TestFilterPillInputComponent;

	constructor() {
		TestFilterPillInputComponent.lastInstance = this;
	}

	isFilterPillEmpty = signal(true);
	isFilterPillClearable = signal(false);

	closePopover?: () => void;

	onFilterPillOpened = vi.fn();
	onFilterPillClosed = vi.fn();

	enableFilterPillMode(): void {}

	clearFilterPillValue(): void {}

	registerFilterPillClosePopover(closeFn: () => void): void {
		this.closePopover = closeFn;
	}
}

@Component({
	template: `<lu-filter-pill label="Department">
		<lu-test-filter-pill-input />
	</lu-filter-pill>`,
	imports: [FilterPillComponent, TestFilterPillInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe(FilterPillComponent.name, () => {
	let fixture: ComponentFixture<HostComponent>;
	let pill: FilterPillComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HostComponent],
		});

		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();

		pill = fixture.debugElement.query(By.directive(FilterPillComponent)).componentInstance as FilterPillComponent;
	});

	function openPopover(): TestFilterPillInputComponent {
		(fixture.debugElement.query(By.css('.filterPill')).nativeElement as HTMLElement).click();
		fixture.detectChanges();

		return TestFilterPillInputComponent.lastInstance;
	}

	it('should notify the input when the popover opens', () => {
		const input = openPopover();

		expect(input.onFilterPillOpened).toHaveBeenCalledTimes(1);
	});

	it('should notify the input when the popover closes on its own', () => {
		const input = openPopover();

		// Close from the popover side (what an outside click or Escape does), without going
		// through the input's registered close function
		pill.popoverRef()?.close();
		fixture.detectChanges();

		expect(input.onFilterPillClosed).toHaveBeenCalledTimes(1);
	});

	it('should notify the input when it closes the popover itself', () => {
		const input = openPopover();

		input.closePopover?.();
		fixture.detectChanges();

		expect(input.onFilterPillClosed).toHaveBeenCalledTimes(1);
	});
});
