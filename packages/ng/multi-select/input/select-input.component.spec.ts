import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, MetadataOverride, TestBed } from '@angular/core/testing';
import { FormControl, NgControl } from '@angular/forms';
import { isNotNil } from '@lucca-front/ng/core';
import { LuCoreSelectTotalCountDirective } from '@lucca-front/ng/core-select';
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

describe('LuMultiSelectInputComponent', () => {
	let fixture: ComponentFixture<LuMultiSelectInputComponent<Entity>>;
	let searchControl: FormControl;

	beforeEach(() => {
		searchControl = new FormControl();

		TestBed.configureTestingModule({
			imports: [LuMultiSelectInputComponent, MultiSelectValueHostComponent],
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
			it('should not emit a new value when parent write a value', () => {
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
				componentInstance.value.subscribe((value) => emittedSelectValues.push(value as unknown as LuMultiSelection<TestEntity>));

				componentInstance.options = options;

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
				// Arrange
				const { componentInstance } = fixture;

				// Act
				componentInstance.value.set({ mode: 'include', values: [options[0]] } as unknown as Entity[]);
				TestBed.flushEffects();

				// Assert
				expect(componentInstance.selectedOptions()).toEqual([options[0]]);
			});
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
