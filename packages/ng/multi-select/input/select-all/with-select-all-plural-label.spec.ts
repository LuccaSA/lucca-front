import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LuCoreSelectTotalCountDirective } from '@lucca-front/ng/core-select';
import { TestEntity } from '../../../core-select/input/select-input.component.spec';
import { LuMultiSelection } from '../../select.model';
import { LuMultiSelectInputComponent } from '../select-input.component';
import { LuMultiSelectWithSelectAllDirective } from './with-select-all.directive';

const options: TestEntity[] = [
	{ id: 1, name: 'test 1' },
	{ id: 2, name: 'test 2' },
	{ id: 3, name: 'test 3' },
	{ id: 4, name: 'test 4' },
	{ id: 5, name: 'test 5' },
];

@Component({
	selector: 'lu-multi-select-plural-label-host',
	imports: [ReactiveFormsModule, LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective, LuCoreSelectTotalCountDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<lu-multi-select [formControl]="formControl" [options]="options" withSelectAll [withSelectAllDisplayerLabelFn]="pluralLabelFn" [totalCount]="options.length" />`,
})
class MultiSelectPluralLabelHostComponent {
	formControl = new FormControl<LuMultiSelection<TestEntity>>({ mode: 'none' }, { nonNullable: true });
	options: TestEntity[] = options;
	pluralLabelFn = (count: number) => ({ few: `${count} few-form`, many: `${count} many-form`, other: `${count} other-form` });
}

describe('LuMultiSelectWithSelectAllDirective', () => {
	function render(selection: LuMultiSelection<TestEntity>): string {
		// A fresh TestBed per call: LOCALE_ID has to be provided before the first component is instantiated
		TestBed.resetTestingModule();
		TestBed.configureTestingModule({
			imports: [MultiSelectPluralLabelHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
		});

		const fixture = TestBed.createComponent(MultiSelectPluralLabelHostComponent);
		fixture.componentInstance.formControl.setValue(selection);
		fixture.detectChanges();

		return (fixture.nativeElement as HTMLElement).querySelector('.multipleSelect-displayer-chip')?.textContent?.trim() ?? '';
	}

	describe('plural resolution of withSelectAllDisplayerLabelFn (via LuPluralForms)', () => {
		it('should use the "few" form for 2 selected values', () => {
			expect(render({ mode: 'include', values: options.slice(0, 2) })).toBe('2 few-form');
		});

		it('should use the "many" form for 5 selected values', () => {
			expect(render({ mode: 'include', values: options.slice(0, 5) })).toBe('5 many-form');
		});
	});
});
