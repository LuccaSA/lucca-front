import { ChangeDetectionStrategy, Component, LOCALE_ID, Type } from '@angular/core';
import { ComponentFixture, MetadataOverride, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { isNotNil } from '@lucca-front/ng/core';
import { LuCoreSelectTotalCountDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { vi } from 'vitest';
import { TestEntity, runALuSelectInputComponentTestSuite } from '../../core-select/input/select-input.component.spec';
import { LuMultiSelection } from '../select.model';
import { LuMultiSelectWithSelectAllDirective } from './select-all';
import { LuMultiSelectInputComponent } from './select-input.component';

type Entity = { id: number; name: string };

const options = [
	{ id: 1, name: 'test 1' },
	{ id: 2, name: 'test 2' },
	{ id: 3, name: 'test 3' },
	{ id: 4, name: 'test 4' },
	{ id: 5, name: 'test 5' },
];

@Component({
	selector: 'lu-multi-select-ng-model-host',
	imports: [FormsModule, LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective, LuCoreSelectTotalCountDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <lu-multi-select [ngModel]="selectedOptions" (ngModelChange)="setSelectedOptions($event)" [options]="options" withSelectAll withSelectAllLabel="lol" [totalCount]="options.length" /> `,
})
class MultiSelectNgModelHostComponent {
	selectedOptions: LuMultiSelection<TestEntity> = { mode: 'none' };

	options: TestEntity[] = options;

	setSelectedOptions(value: LuMultiSelection<TestEntity>) {
		this.selectedOptions = value;
	}
}

@Component({
	selector: 'lu-multi-select-form-control-host',
	imports: [ReactiveFormsModule, LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective, LuCoreSelectTotalCountDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <lu-multi-select [formControl]="formControl" [options]="options" withSelectAll withSelectAllLabel="lol" [totalCount]="options.length" /> `,
})
class MultiSelectFormControlHostComponent {
	formControl = new FormControl<LuMultiSelection<TestEntity>>({ mode: 'none' }, { nonNullable: true });

	options: TestEntity[] = options;
}

@Component({
	selector: 'lu-multi-select-filter-pill-host',
	imports: [FormsModule, FilterPillComponent, LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective, LuCoreSelectTotalCountDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-filter-pill label="Filter">
			<lu-multi-select [ngModel]="selection" [options]="options" withSelectAll withSelectAllDisplayerLabel="items" [totalCount]="options.length" />
		</lu-filter-pill>
	`,
})
class MultiSelectFilterPillHostComponent {
	selection: LuMultiSelection<TestEntity> = { mode: 'none' };

	options: TestEntity[] = options;
}

interface PresentationHost {
	selectedOptions: TestEntity[];
}

@Component({
	selector: 'lu-multi-select-presentation-host',
	imports: [FormsModule, LuMultiSelectInputComponent, FormFieldComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-form-field label="Options" presentation>
			<lu-multi-select [ngModel]="selectedOptions" [options]="options" />
		</lu-form-field>
	`,
})
class MultiSelectPresentationHostComponent implements PresentationHost {
	selectedOptions: TestEntity[] = [];

	options: TestEntity[] = options;
}

@Component({
	selector: 'lu-multi-select-custom-tpl-presentation-host',
	imports: [FormsModule, LuMultiSelectInputComponent, FormFieldComponent, LuOptionDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-form-field label="Options" presentation>
			<lu-multi-select #selectRef [ngModel]="selectedOptions" [options]="options">
				<ng-container *luOption="let option; select: selectRef"
					><strong>[{{ option.name }}]</strong></ng-container
				>
			</lu-multi-select>
		</lu-form-field>
	`,
})
class MultiSelectCustomTplPresentationHostComponent implements PresentationHost {
	selectedOptions: TestEntity[] = [];

	options: TestEntity[] = options;
}

@Component({
	selector: 'lu-multi-select-select-all-presentation-host',
	imports: [FormsModule, LuMultiSelectInputComponent, FormFieldComponent, LuMultiSelectWithSelectAllDirective, LuCoreSelectTotalCountDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-form-field label="Options" presentation>
			<lu-multi-select [ngModel]="selection" [options]="options" withSelectAll withSelectAllLabel="options" withSelectAllDisplayerLabel="options" [totalCount]="options.length" />
		</lu-form-field>
	`,
})
class MultiSelectSelectAllPresentationHostComponent {
	selection: LuMultiSelection<TestEntity> = { mode: 'none' };

	options: TestEntity[] = options;
}

describe('LuMultiSelectInputComponent', () => {
	let fixture: ComponentFixture<LuMultiSelectInputComponent<Entity>>;
	let searchControl: FormControl;

	beforeEach(() => {
		searchControl = new FormControl();

		TestBed.configureTestingModule({
			imports: [LuMultiSelectInputComponent, MultiSelectFormControlHostComponent, MultiSelectNgModelHostComponent, MultiSelectFilterPillHostComponent, MultiSelectPresentationHostComponent],
			providers: [
				// The input inside the displayer needs a NgControl
				{
					provide: NgControl,
					useValue: searchControl,
				},
			],
			teardown: { destroyAfterEach: false },
		});
	});

	describe('core suite', () => {
		beforeEach(() => {
			fixture = createComponent();
			fixture.detectChanges();
		});

		runALuSelectInputComponentTestSuite<Entity[]>({
			getFixture: () => fixture,
			exampleValue: [{ id: 1, name: 'test' }],
			emptyValue: [],
			clearerSelector: '.multipleSelect-clear',
		});
	});

	describe('Select all', () => {
		let selectAllDirective: LuMultiSelectWithSelectAllDirective<Entity>;
		let emittedSelectValues: Array<LuMultiSelection<TestEntity> | TestEntity[]>;

		describe('parent set a value', () => {
			it('should not emit a new value when parent write a value (with NgModel)', () => {
				// Arrange
				const hostFixture = TestBed.createComponent(MultiSelectNgModelHostComponent);
				const hostComponent = hostFixture.componentInstance;

				vi.spyOn(hostComponent, 'setSelectedOptions');

				// Act
				hostComponent.selectedOptions = { mode: 'include', values: [options[0]] };
				hostFixture.detectChanges();

				// Assert
				expect(hostComponent.setSelectedOptions).not.toHaveBeenCalled();
			});

			it('should not emit a new value when parent write a value (with FormControl)', () => {
				// Arrange
				const hostFixture = TestBed.createComponent(MultiSelectFormControlHostComponent);
				const hostComponent = hostFixture.componentInstance;
				hostFixture.detectChanges();

				const onChange = vi.fn();
				hostComponent.formControl.valueChanges.subscribe(onChange);

				// Act
				hostComponent.formControl.setValue({ mode: 'include', values: [options[0]] }, { emitEvent: false });
				hostFixture.detectChanges();

				// Assert
				expect(onChange).not.toHaveBeenCalled();
			});
		});

		describe('select emits a value', () => {
			beforeEach(() => {
				emittedSelectValues = [];
				fixture = createComponent({
					add: {
						hostDirectives: [
							{ directive: LuCoreSelectTotalCountDirective, inputs: ['totalCount'] },
							{ directive: LuMultiSelectWithSelectAllDirective, inputs: ['withSelectAllDisplayerLabel'] },
						],
					},
				});

				const { componentInstance } = fixture;
				selectAllDirective = fixture.componentRef.injector.get<LuMultiSelectWithSelectAllDirective<TestEntity>>(LuMultiSelectWithSelectAllDirective);
				componentInstance.registerOnChange((value) => {
					if (value !== null) {
						emittedSelectValues.push(value);
					}
				});

				componentInstance.options.set(options);

				fixture.componentRef.setInput('totalCount', options.length);
				fixture.componentRef.setInput('withSelectAllDisplayerLabel', 'Displayer Label');
				fixture.detectChanges();
			});

			it('should not emit value on init', async () => {
				// Arrange
				const { componentInstance } = fixture;
				componentInstance.openPanel();
				await waitForPanel(componentInstance);
				componentInstance.panelRef?.changeDetectorRef?.detectChanges();

				// Act
				TestBed.flushEffects();

				// Assert
				expect(emittedSelectValues).toEqual([]);
			});

			it('should emit all when clicking on select all while selection was empty', async () => {
				// Arrange
				const { componentInstance } = fixture;
				componentInstance.openPanel();
				await waitForPanel(componentInstance);
				componentInstance.panelRef?.changeDetectorRef?.detectChanges();

				// Act
				selectAllDirective.setSelectAll(true);
				TestBed.flushEffects();

				// Assert
				expect(emittedSelectValues).toEqual([{ mode: 'all' }]);
			});

			it('should emit mode exclude when clicking on select all then selecting option', async () => {
				// Arrange
				const { componentInstance } = fixture;
				componentInstance.openPanel();
				await waitForPanel(componentInstance);
				componentInstance.panelRef?.changeDetectorRef?.detectChanges();

				// Act
				selectAllDirective.setSelectAll(true);
				TestBed.flushEffects();
				componentInstance.panelRef?.emitValue([options[0]]);
				TestBed.flushEffects();

				// Assert
				expect(emittedSelectValues).toEqual([{ mode: 'all' }, { mode: 'exclude', values: [options[0]] }]);
			});

			it('should emit mode include when clicking on select all then selecting option', async () => {
				// Arrange
				const { componentInstance } = fixture;
				componentInstance.openPanel();
				await waitForPanel(componentInstance);
				componentInstance.panelRef?.changeDetectorRef?.detectChanges();

				// Act
				componentInstance.panelRef?.emitValue([options[0]]);
				TestBed.flushEffects();

				// Assert
				expect(emittedSelectValues).toEqual([{ mode: 'include', values: [options[0]] }]);
			});

			it('should set "all" selection when clicking on select all with included option', async () => {
				// Arrange
				const { componentInstance } = fixture;
				componentInstance.openPanel();
				await waitForPanel(componentInstance);
				componentInstance.panelRef?.changeDetectorRef?.detectChanges();

				// Act
				componentInstance.panelRef?.emitValue([options[0]]);
				TestBed.flushEffects();
				selectAllDirective.setSelectAll(true);
				TestBed.flushEffects();

				// Assert
				expect(emittedSelectValues).toEqual([{ mode: 'include', values: [options[0]] }, { mode: 'all' }]);
			});

			it('should set "none" selection when clicking on select all with excluded option', async () => {
				// Arrange
				const { componentInstance } = fixture;
				componentInstance.openPanel();
				await waitForPanel(componentInstance);
				componentInstance.panelRef?.changeDetectorRef?.detectChanges();

				// Act
				selectAllDirective.setSelectAll(true);
				TestBed.flushEffects();
				componentInstance.panelRef?.emitValue([options[0]]);
				TestBed.flushEffects();
				selectAllDirective.setSelectAll(false);
				TestBed.flushEffects();

				// Assert
				expect(emittedSelectValues).toEqual([
					{ mode: 'all' },
					{
						mode: 'exclude',
						values: [options[0]],
					},
					{ mode: 'none' },
				]);
			});

			it('should emit mode all when clicking on each option', async () => {
				const { componentInstance } = fixture;
				componentInstance.openPanel();
				await waitForPanel(componentInstance);
				componentInstance.panelRef?.changeDetectorRef?.detectChanges();

				// Act
				componentInstance.panelRef?.emitValue(options);
				TestBed.flushEffects();

				// Assert
				expect(emittedSelectValues).toEqual([{ mode: 'all' }]);
			});

			it('should emit "none" selection when clicking on select all then clear', async () => {
				// Arrange
				const { componentInstance } = fixture;
				componentInstance.openPanel();
				await waitForPanel(componentInstance);
				componentInstance.panelRef?.changeDetectorRef?.detectChanges();

				// Act
				selectAllDirective.setSelectAll(true);
				TestBed.flushEffects();
				selectAllDirective.clearValue({
					stopPropagation: () => {},
				} as Event);
				TestBed.flushEffects();

				// Assert
				expect(emittedSelectValues).toEqual([{ mode: 'all' }, { mode: 'none' }]);
			});

			it('should emit "none" selection when clicking on select all then unselect each option', async () => {
				// Arrange
				const { componentInstance } = fixture;
				componentInstance.openPanel();
				await waitForPanel(componentInstance);
				componentInstance.panelRef?.changeDetectorRef?.detectChanges();

				// Act
				selectAllDirective.setSelectAll(true);
				TestBed.flushEffects();
				componentInstance.panelRef?.emitValue(options);
				TestBed.flushEffects();

				// Assert
				expect(emittedSelectValues).toEqual([{ mode: 'all' }, { mode: 'none' }]);
			});

			it('should not convert array of options to selection', () => {
				// Arrange
				const { componentInstance } = fixture;

				// Act
				const act = () => componentInstance.writeValue([options[0]]);

				// Assert
				expect(act).toThrow('MultiSelectWithSelectAllDirective does not support array values. The form value or ngModel must be a LuMultiSelection<TValue>.');
			});

			it('should work with not empty initial value', () => {
				// Arrange
				const { componentInstance } = fixture;

				// Act
				selectAllDirective.writeValue({ mode: 'include', values: [options[0]] });

				// Assert
				expect(componentInstance.value).toEqual([options[0]]);
			});
		});

		describe('single remaining option displayer', () => {
			beforeEach(() => {
				emittedSelectValues = [];
				fixture = createComponent({
					add: {
						hostDirectives: [
							{ directive: LuCoreSelectTotalCountDirective, inputs: ['totalCount'] },
							{ directive: LuMultiSelectWithSelectAllDirective, inputs: ['withSelectAllDisplayerLabel'] },
						],
					},
				});

				selectAllDirective = fixture.componentRef.injector.get<LuMultiSelectWithSelectAllDirective<TestEntity>>(LuMultiSelectWithSelectAllDirective);
				fixture.componentInstance.registerOnChange((value) => emittedSelectValues.push(value));
				fixture.componentInstance.options.set(options);

				fixture.componentRef.setInput('totalCount', options.length);
				fixture.componentRef.setInput('withSelectAllDisplayerLabel', 'items');
				fixture.detectChanges();
			});

			function displayerChipText(): string {
				fixture.detectChanges();
				return (fixture.nativeElement as HTMLElement).querySelector('.multipleSelect-displayer-chip')?.textContent?.trim() ?? '';
			}

			it('should display the remaining option when a single option remains selected in exclude mode', () => {
				// Act
				selectAllDirective.writeValue({ mode: 'exclude', values: options.slice(1) });

				// Assert
				expect(displayerChipText()).toContain(options[0].name);
			});

			it('should display the counter when several options remain selected in exclude mode', () => {
				// Act
				selectAllDirective.writeValue({ mode: 'exclude', values: [options[0]] });

				// Assert
				expect(displayerChipText()).toBe('4 items');
			});

			it('should fall back to the counter when every option is not known locally', () => {
				// Arrange
				fixture.componentRef.setInput('totalCount', options.length + 1);

				// Act
				selectAllDirective.writeValue({ mode: 'exclude', values: options.slice(1) });

				// Assert
				expect(displayerChipText()).toBe('2 items');
			});

			it('should emit "none" selection when killing the remaining option chip in exclude mode', () => {
				// Arrange
				selectAllDirective.writeValue({ mode: 'exclude', values: options.slice(1) });
				fixture.detectChanges();

				// Act
				const killButton = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.multipleSelect-displayer-chip .chip-kill');
				killButton?.click();

				// Assert
				expect(emittedSelectValues).toEqual([{ mode: 'none' }]);
			});
		});

		describe('filter pill single remaining option displayer', () => {
			async function createFilterPillHost(selection: LuMultiSelection<TestEntity>): Promise<ComponentFixture<MultiSelectFilterPillHostComponent>> {
				const hostFixture = TestBed.createComponent(MultiSelectFilterPillHostComponent);
				hostFixture.componentInstance.selection = selection;
				hostFixture.detectChanges();
				// NgModel writes the value asynchronously
				await hostFixture.whenStable();
				hostFixture.detectChanges();
				return hostFixture;
			}

			it('should display the remaining option in the filter pill when a single option remains selected in exclude mode', async () => {
				// Act
				const hostFixture = await createFilterPillHost({ mode: 'exclude', values: options.slice(1) });

				// Assert
				const chip = (hostFixture.nativeElement as HTMLElement).querySelector('.multipleSelect-pill-displayer-chip');
				expect(chip?.textContent?.trim()).toContain(options[0].name);
			});

			it('should not display the single option chip in the filter pill when several options remain selected in exclude mode', async () => {
				// Act
				const hostFixture = await createFilterPillHost({ mode: 'exclude', values: [options[0]] });

				// Assert
				expect((hostFixture.nativeElement as HTMLElement).querySelector('.multipleSelect-pill-displayer-chip')).toBeNull();
			});
		});
	});

	describe('presentation mode', () => {
		async function renderPresentation<THost>(host: Type<THost>, locale: string, writeValue: (hostComponent: THost) => void): Promise<string> {
			// A fresh TestBed per call: LOCALE_ID has to be provided before the first component is instantiated
			TestBed.resetTestingModule();
			TestBed.configureTestingModule({
				imports: [host],
				providers: [
					{ provide: NgControl, useValue: new FormControl() },
					{ provide: LOCALE_ID, useValue: locale },
				],
				teardown: { destroyAfterEach: false },
			});

			const hostFixture = TestBed.createComponent(host);
			writeValue(hostFixture.componentInstance);
			hostFixture.detectChanges();
			// ngModel writes its value asynchronously
			await hostFixture.whenStable();
			hostFixture.detectChanges();

			const presentation = (hostFixture.nativeElement as HTMLElement).querySelector('.presentation-definition');
			return presentation?.textContent?.trim() ?? '';
		}

		function getPresentationText(host: Type<PresentationHost>, selectedOptions: TestEntity[], locale: string): Promise<string> {
			return renderPresentation(host, locale, (hostComponent) => (hostComponent.selectedOptions = selectedOptions));
		}

		it.each([
			['fr-FR', 3, 'test 1, test 2 et test 3'],
			['en-GB', 3, 'test 1, test 2 and test 3'],
			['fr-FR', 2, 'test 1 et test 2'],
			['en-GB', 2, 'test 1 and test 2'],
			['fr-FR', 1, 'test 1'],
			['en-GB', 1, 'test 1'],
		])('should join %s values with locale-aware separators (%i values)', async (locale, count, expected) => {
			expect(await getPresentationText(MultiSelectPresentationHostComponent, options.slice(0, count), locale)).toBe(expected);
		});

		it('should interleave separators with a custom option template', async () => {
			const fixtureText = await getPresentationText(MultiSelectCustomTplPresentationHostComponent, options.slice(0, 3), 'fr-FR');

			expect(fixtureText).toBe('[test 1], [test 2] et [test 3]');
		});

		it('should base separators on the rendered values, not on withSelectAll displayer count', async () => {
			// withSelectAll overwrites valueLength() with the selected count: 4 here, while a single excluded value
			// is rendered. Counting those would leave a trailing separator.
			const fixtureText = await renderPresentation(MultiSelectSelectAllPresentationHostComponent, 'fr-FR', (hostComponent) => (hostComponent.selection = { mode: 'exclude', values: [options[0]] }));

			expect(fixtureText).toBe('test 1');
		});
	});
});

function createComponent(override?: MetadataOverride<Component>) {
	if (override) {
		TestBed.overrideComponent(LuMultiSelectInputComponent, override);
	}

	return TestBed.createComponent<LuMultiSelectInputComponent<Entity>>(LuMultiSelectInputComponent);
}

// openPanel() defers panel creation via setTimeout, wait until panelRef is set
function waitForPanel(componentInstance: LuMultiSelectInputComponent<Entity>) {
	return vi.waitUntil(() => isNotNil(componentInstance.panelRef));
}
