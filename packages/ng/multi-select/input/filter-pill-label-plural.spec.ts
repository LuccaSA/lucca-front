import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { TestEntity } from '../../core-select/input/select-input.component.spec';
import { LuMultiSelectInputComponent } from './select-input.component';

const options: TestEntity[] = [
	{ id: 1, name: 'test 1' },
	{ id: 2, name: 'test 2' },
	{ id: 3, name: 'test 3' },
	{ id: 4, name: 'test 4' },
	{ id: 5, name: 'test 5' },
];

@Component({
	selector: 'lu-multi-select-filter-pill-plural-label-host',
	imports: [FormsModule, FilterPillComponent, LuMultiSelectInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-filter-pill label="Filter">
			<lu-multi-select [ngModel]="selectedOptions" [options]="options" [filterPillLabelPluralFn]="pluralLabelFn" />
		</lu-filter-pill>
	`,
})
class MultiSelectFilterPillPluralLabelHostComponent {
	selectedOptions: TestEntity[] = [];
	options: TestEntity[] = options;
	pluralLabelFn = (count: number) => ({ few: `${count} few-form`, many: `${count} many-form`, other: `${count} other-form` });
}

describe('LuMultiSelectInputComponent filterPillLabelPluralFn', () => {
	async function render(selectedOptions: TestEntity[]): Promise<string> {
		// A fresh TestBed per call: LOCALE_ID has to be provided before the first component is instantiated
		TestBed.resetTestingModule();
		TestBed.configureTestingModule({
			imports: [MultiSelectFilterPillPluralLabelHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
		});

		const fixture = TestBed.createComponent(MultiSelectFilterPillPluralLabelHostComponent);
		fixture.componentInstance.selectedOptions = selectedOptions;
		fixture.detectChanges();
		// NgModel writes the value asynchronously
		await fixture.whenStable();
		fixture.detectChanges();

		return (fixture.nativeElement as HTMLElement).querySelector('.multipleSelect-pill-displayer-label')?.textContent?.trim() ?? '';
	}

	describe('plural resolution of filterPillLabelPluralFn (via LuPluralForms)', () => {
		it('should use the "few" form for 2 selected values', async () => {
			expect(await render(options.slice(0, 2))).toBe('2 few-form');
		});

		it('should use the "many" form for 5 selected values', async () => {
			expect(await render(options.slice(0, 5))).toBe('5 many-form');
		});
	});
});
