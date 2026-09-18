import { ChangeDetectionStrategy, Component, LOCALE_ID, Type } from '@angular/core';
import { ComponentFixture, MetadataOverride, TestBed } from '@angular/core/testing';
import { FormControl, NgControl } from '@angular/forms';
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
	selector: 'lu-multi-select-value-host',
	imports: [LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective, LuCoreSelectTotalCountDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-multi-select [value]="$any(selectedOptions)" (valueChange)="setSelectedOptions($any($event))" [options]="options" withSelectAll withSelectAllLabel="lol" [totalCount]="options.length" />
	`,
})
class MultiSelectValueHostComponent {
	selectedOptions: LuMultiSelection<TestEntity> = { mode: 'none' };

	options: TestEntity[] = options;

	setSelectedOptions(value: LuMultiSelection<TestEntity>) {
		this.selectedOptions = value;
	}
}

@Component({
	selector: 'lu-multi-select-filter-pill-host',
	imports: [FilterPillComponent, LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective, LuCoreSelectTotalCountDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-filter-pill label="Filter">
			<lu-multi-select [value]="$any(selection)" [options]="options" withSelectAll withSelectAllDisplayerLabel="items" [totalCount]="options.length" />
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
	imports: [LuMultiSelectInputComponent, FormFieldComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-form-field label="Options" presentation>
			<lu-multi-select [value]="selectedOptions" [options]="options" />
		</lu-form-field>
	`,
})
class MultiSelectPresentationHostComponent implements PresentationHost {
	selectedOptions: TestEntity[] = [];

	options: TestEntity[] = options;
}

@Component({
	selector: 'lu-multi-select-custom-tpl-presentation-host',
	imports: [LuMultiSelectInputComponent, FormFieldComponent, LuOptionDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-form-field label="Options" presentation>
			<lu-multi-select #selectRef [value]="selectedOptions" [options]="options">
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
	imports: [LuMultiSelectInputComponent, FormFieldComponent, LuMultiSelectWithSelectAllDirective, LuCoreSelectTotalCountDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-form-field label="Options" presentation>
			<lu-multi-select [value]="$any(selection)" [options]="options" withSelectAll withSelectAllLabel="options" withSelectAllDisplayerLabel="options" [totalCount]="options.length" />
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
			imports: [LuMultiSelectInputComponent, MultiSelectFilterPillHostComponent, MultiSelectPresentationHostComponent],
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

	function setSelection(selection: LuMultiSelection<TestEntity>): void {
		(fixture.componentInstance.value as unknown as { set: (value: LuMultiSelection<TestEntity>) => void }).set(selection);
		TestBed.flushEffects();
		fixture.detectChanges();
	}

	describe('Select all', () => {
		let selectAllDirective: LuMultiSelectWithSelectAllDirective<Entity>;
		let emittedSelectValues: Array<LuMultiSelection<TestEntity> | TestEntity[]>;

		describe('parent set a value', () => {
			it('should not emit a new value when parent writes a value', () => {
				// Arrange
				const hostFixture = TestBed.createComponent(MultiSelectValueHostComponent);
				const hostComponent = hostFixture.componentInstance;

				vi.spyOn(hostComponent, 'setSelectedOptions');

				// Act
				hostComponent.selectedOptions = { mode: 'include', values: [options[0]] };
				hostFixture.detectChanges();

				// Assert
				expect(hostComponent.setSelectedOptions).not.toHaveBeenCalled();
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
				componentInstance.value.subscribe((value) => {
					if (value !== null) {
						emittedSelectValues.push(value as unknown as LuMultiSelection<TestEntity>);
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
				const act = () => {
					componentInstance.value.set([options[0]]);
					TestBed.flushEffects();
				};

				// Assert
				expect(act).toThrow('MultiSelectWithSelectAllDirective does not support array values. The form value or ngModel must be a LuMultiSelection<TValue>.');
			});

			it('should work with not empty initial value', () => {
				// Act
				setSelection({ mode: 'include', values: [options[0]] });

				// Assert
				expect(selectAllDirective.values()).toEqual([options[0]]);
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
				fixture.componentInstance.value.subscribe((value) => emittedSelectValues.push(value as unknown as LuMultiSelection<TestEntity>));
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
				setSelection({ mode: 'exclude', values: options.slice(1) });

				// Assert
				expect(displayerChipText()).toContain(options[0].name);
			});

			it('should display the counter when several options remain selected in exclude mode', () => {
				// Act
				setSelection({ mode: 'exclude', values: [options[0]] });

				// Assert
				expect(displayerChipText()).toBe('4 items');
			});

			it('should fall back to the counter when every option is not known locally', () => {
				// Arrange
				fixture.componentRef.setInput('totalCount', options.length + 1);

				// Act
				setSelection({ mode: 'exclude', values: options.slice(1) });

				// Assert
				expect(displayerChipText()).toBe('2 items');
			});

			it('should emit "none" selection when killing the remaining option chip in exclude mode', () => {
				// Arrange
				setSelection({ mode: 'exclude', values: options.slice(1) });
				fixture.detectChanges();
				// The value model also reports the selection written above, which is not what this asserts on
				emittedSelectValues.length = 0;

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
