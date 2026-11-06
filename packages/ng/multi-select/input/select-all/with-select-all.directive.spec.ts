import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LuCoreSelectTotalCountDirective } from '@lucca-front/ng/core-select';
import { LuOptionComparer } from '@lucca-front/ng/option';
import { LuMultiSelection } from '../../select.model';
import { LuMultiSelectInputComponent } from '../select-input.component';
import { LuMultiSelectAllHeaderComponent } from './multi-select-all-header.component';
import { LuMultiSelectWithSelectAllDirective } from './with-select-all.directive';

interface Entity {
	id: number;
	name: string;
}

const options: Entity[] = [
	{ id: 1, name: 'test 1' },
	{ id: 2, name: 'test 2' },
	{ id: 3, name: 'test 3' },
	{ id: 4, name: 'test 4' },
	{ id: 5, name: 'test 5' },
];

const compareById: LuOptionComparer<Entity> = (a, b) => a.id === b.id;

@Component({
	selector: 'lu-multi-select-with-select-all-host',
	imports: [ReactiveFormsModule, LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective, LuCoreSelectTotalCountDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-multi-select
			[formControl]="formControl"
			[options]="options"
			[optionComparer]="optionComparer()"
			withSelectAll
			[withSelectAllDisplayerLabel]="displayerLabel()"
			[withSelectAllDisplayerLabelFn]="displayerLabelFn()"
			[totalCount]="totalCount()"
		/>
	`,
})
class WithSelectAllHostComponent {
	readonly totalCount = input(options.length);
	readonly displayerLabel = input<string | undefined>('items');
	readonly displayerLabelFn = input<((count: number) => string) | undefined>(undefined);
	readonly optionComparer = input<LuOptionComparer<Entity>>((a, b) => a === b);

	readonly formControl = new FormControl<LuMultiSelection<Entity> | null>({ mode: 'none' });

	readonly options = options;
}

describe(LuMultiSelectWithSelectAllDirective.name, () => {
	let fixture: ComponentFixture<WithSelectAllHostComponent>;
	let formControl: FormControl<LuMultiSelection<Entity> | null>;
	let directive: LuMultiSelectWithSelectAllDirective<Entity>;
	let select: LuMultiSelectInputComponent<Entity>;

	const setup = (inputs: Partial<Record<'totalCount' | 'displayerLabel' | 'displayerLabelFn' | 'optionComparer', unknown>> = {}) => {
		Object.entries(inputs).forEach(([name, value]) => fixture.componentRef.setInput(name, value));
		fixture.detectChanges();
		const selectDebugElement = fixture.debugElement.query(By.directive(LuMultiSelectInputComponent));
		select = selectDebugElement.componentInstance as LuMultiSelectInputComponent<Entity>;
		directive = selectDebugElement.injector.get<LuMultiSelectWithSelectAllDirective<Entity>>(LuMultiSelectWithSelectAllDirective);
	};

	/** Mimics the panel emitting the options checked one by one by the user. */
	const checkOptions = (values: Entity[]) => select.updateValue(values, true);

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [WithSelectAllHostComponent],
		});

		fixture = TestBed.createComponent(WithSelectAllHostComponent);
		formControl = fixture.componentInstance.formControl;
	});

	describe('isSelected', () => {
		beforeEach(() => setup());

		it.each<[LuMultiSelection<Entity>, Entity[], boolean]>([
			[{ mode: 'all' }, [], true],
			[{ mode: 'none' }, [options[0]], false],
			[{ mode: 'include', values: [options[0]] }, [options[0]], true],
			[{ mode: 'include', values: [options[1]] }, [options[1]], false],
			[{ mode: 'exclude', values: [options[0]] }, [options[0]], false],
			[{ mode: 'exclude', values: [options[1]] }, [options[1]], true],
		])('should consider the first option selected for %j: %s', (selection, selectedOptions, expected) => {
			// Arrange
			formControl.setValue(selection);
			// Act
			const result = directive.isSelected(options[0], selectedOptions, compareById);
			// Assert
			expect(result).toBe(expected);
		});
	});

	describe('isGroupSelected', () => {
		beforeEach(() => setup());

		it.each<[LuMultiSelection<Entity>, Entity[], boolean]>([
			[{ mode: 'all' }, [options[0]], true],
			[{ mode: 'none' }, [], false],
			[{ mode: 'include', values: [options[0]] }, [], true],
			[{ mode: 'include', values: [options[0]] }, [options[1]], false],
			[{ mode: 'exclude', values: [options[0]] }, [options[0]], true],
			[{ mode: 'exclude', values: [options[0]] }, [], false],
		])('should compute group selection for %j with not selected options %j: %s', (selection, notSelectedOptions, expected) => {
			// Arrange
			formControl.setValue(selection);
			// Act
			const result = directive.isGroupSelected(options, notSelectedOptions);
			// Assert
			expect(result).toBe(expected);
		});
	});

	describe('displayer', () => {
		it.each<[LuMultiSelection<Entity>, number | null]>([
			[{ mode: 'none' }, null],
			[{ mode: 'all' }, 5],
			[{ mode: 'include', values: options.slice(0, 2) }, 2],
			[{ mode: 'exclude', values: options.slice(0, 2) }, 3],
		])('should count the selected options for %j', (selection, expected) => {
			// Arrange
			setup();
			// Act
			formControl.setValue(selection);
			// Assert
			expect(directive.displayerCount()).toBe(expected);
			expect(select.valueLength()).toBe(expected ?? 0);
		});

		it('should rely on the total count rather than on the loaded options', () => {
			// Arrange
			setup({ totalCount: 42 });
			// Act
			formControl.setValue({ mode: 'exclude', values: [options[0]] });
			// Assert
			expect(directive.displayerCount()).toBe(41);
		});

		it('should prefix withSelectAllDisplayerLabel with the count', () => {
			// Arrange
			setup({ displayerLabel: 'items' });
			// Act
			formControl.setValue({ mode: 'all' });
			// Assert
			expect(directive.displayerLabelValue()).toBe('5 items');
		});

		it('should use withSelectAllDisplayerLabelFn over withSelectAllDisplayerLabel', () => {
			// Arrange
			setup({ displayerLabel: 'items', displayerLabelFn: (count: number) => `${count} selected` });
			// Act
			formControl.setValue({ mode: 'include', values: options.slice(0, 3) });
			// Assert
			expect(directive.displayerLabelValue()).toBe('3 selected');
		});

		it('should display the label in the displayer chip', () => {
			// Arrange
			setup();
			// Act
			formControl.setValue({ mode: 'exclude', values: [options[0]] });
			fixture.detectChanges();
			// Assert
			expect((fixture.nativeElement as HTMLElement).querySelector('.multipleSelect-displayer-chip')?.textContent?.trim()).toBe('4 items');
		});
	});

	describe('value presence', () => {
		beforeEach(() => setup());

		it('should consider the select empty in "none" mode', () => {
			// Act
			formControl.setValue({ mode: 'none' });
			// Assert
			expect(select.hasValue()).toBe(false);
			expect(select.isFilterPillEmpty()).toBe(true);
		});

		it('should consider the select filled in "all" mode even without values', () => {
			// Act
			formControl.setValue({ mode: 'all' });
			// Assert
			expect(select.hasValue()).toBe(true);
			expect(select.isFilterPillEmpty()).toBe(false);
		});
	});

	describe('writeValue', () => {
		beforeEach(() => setup());

		it('should treat a null value as an empty selection', () => {
			// Act
			formControl.setValue(null);
			// Assert
			expect(directive.mode()).toBe('none');
			expect(directive.values()).toEqual([]);
			expect(select.value).toEqual([]);
		});

		it('should not pass any value to the select in "all" mode', () => {
			// Act
			formControl.setValue({ mode: 'all' });
			// Assert
			expect(directive.mode()).toBe('all');
			expect(select.value).toEqual([]);
		});

		it('should pass the excluded values to the select in "exclude" mode', () => {
			// Act
			formControl.setValue({ mode: 'exclude', values: [options[0]] });
			// Assert
			expect(directive.mode()).toBe('exclude');
			expect(select.value).toEqual([options[0]]);
		});
	});

	describe('selection transitions', () => {
		beforeEach(() => setup());

		it('should stay in "include" mode when checking more options', () => {
			// Arrange
			formControl.setValue({ mode: 'include', values: [options[0]] });
			// Act
			checkOptions(options.slice(0, 2));
			// Assert
			expect(formControl.value).toEqual({ mode: 'include', values: options.slice(0, 2) });
		});

		it('should switch from "include" to "none" when unchecking the last option', () => {
			// Arrange
			formControl.setValue({ mode: 'include', values: [options[0]] });
			// Act
			checkOptions([]);
			// Assert
			expect(formControl.value).toEqual({ mode: 'none' });
		});

		it('should stay in "exclude" mode when unchecking more options', () => {
			// Arrange
			formControl.setValue({ mode: 'exclude', values: [options[0]] });
			// Act
			checkOptions(options.slice(0, 2));
			// Assert
			expect(formControl.value).toEqual({ mode: 'exclude', values: options.slice(0, 2) });
		});

		it('should switch from "exclude" to "all" when checking back every excluded option', () => {
			// Arrange
			formControl.setValue({ mode: 'exclude', values: [options[0]] });
			// Act
			checkOptions([]);
			// Assert
			expect(formControl.value).toEqual({ mode: 'all' });
		});

		it('should reset the select inner value once every option has been checked one by one', () => {
			// Arrange
			formControl.setValue({ mode: 'include', values: options.slice(0, 4) });
			// Act
			checkOptions(options);
			// Assert
			expect(formControl.value).toEqual({ mode: 'all' });
			expect(select.value).toEqual([]);
		});
	});

	describe('setSelectAll', () => {
		beforeEach(() => setup());

		it('should drop the included values when selecting all', () => {
			// Arrange
			formControl.setValue({ mode: 'include', values: [options[0]] });
			// Act
			directive.setSelectAll(true);
			// Assert
			expect(formControl.value).toEqual({ mode: 'all' });
			expect(directive.values()).toEqual([]);
			expect(select.value).toEqual([]);
		});

		it('should drop the excluded values when unselecting all', () => {
			// Arrange
			formControl.setValue({ mode: 'exclude', values: [options[0]] });
			// Act
			directive.setSelectAll(false);
			// Assert
			expect(formControl.value).toEqual({ mode: 'none' });
			expect(directive.values()).toEqual([]);
		});

		it('should focus the input back while keeping the search when selecting all', () => {
			// Arrange
			const focusRequests: unknown[] = [];
			select.focusInput$.subscribe((request) => focusRequests.push(request));
			// Act
			directive.setSelectAll(true);
			// Assert
			expect(focusRequests).toEqual([{ keepClue: true }]);
		});

		it('should not focus the input when unselecting all', () => {
			// Arrange
			const focusRequests: unknown[] = [];
			select.focusInput$.subscribe((request) => focusRequests.push(request));
			// Act
			directive.setSelectAll(false);
			// Assert
			expect(focusRequests).toEqual([]);
		});
	});

	describe('panel header', () => {
		it('should display the select all header when there is no search', () => {
			// Act
			setup();
			TestBed.flushEffects();
			// Assert
			expect(select.panelHeaderTpl()).toBe(LuMultiSelectAllHeaderComponent);
		});

		it('should hide the select all header while searching', () => {
			// Arrange
			setup();
			// Act
			select.clueChanged('test', true);
			TestBed.flushEffects();
			// Assert
			expect(select.panelHeaderTpl()).toBeUndefined();
		});

		it('should display the select all header back when the search is cleared', () => {
			// Arrange
			setup();
			select.clueChanged('test', true);
			TestBed.flushEffects();
			// Act
			select.clueChanged('', true);
			TestBed.flushEffects();
			// Assert
			expect(select.panelHeaderTpl()).toBe(LuMultiSelectAllHeaderComponent);
		});

		it('should hide the select all header when the search is cleared but there is no option', () => {
			// Arrange
			setup({ totalCount: 0 });
			select.clueChanged('test', true);
			TestBed.flushEffects();
			// Act
			select.clueChanged('', true);
			TestBed.flushEffects();
			// Assert
			expect(select.panelHeaderTpl()).toBeUndefined();
		});
	});

	describe('singleRemainingOption', () => {
		it('should find the remaining option with the select optionComparer', () => {
			// Arrange
			setup({ optionComparer: compareById });
			// Act
			formControl.setValue({ mode: 'exclude', values: options.slice(1).map((option) => ({ ...option })) });
			// Assert
			expect(directive.singleRemainingOption()).toBe(options[0]);
		});

		it('should not find any remaining option outside of "exclude" mode', () => {
			// Arrange
			setup();
			// Act
			formControl.setValue({ mode: 'include', values: [options[0]] });
			// Assert
			expect(directive.singleRemainingOption()).toBeUndefined();
		});
	});
});
