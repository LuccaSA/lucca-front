import { Component } from '@angular/core';
import { ComponentFixture, MetadataOverride, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { LuCoreSelectTotalCountDirective } from '@lucca-front/ng/core-select';
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
	standalone: true,
	imports: [FormsModule, LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective, LuCoreSelectTotalCountDirective],
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
	standalone: true,
	imports: [ReactiveFormsModule, LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective, LuCoreSelectTotalCountDirective],
	template: ` <lu-multi-select [formControl]="formControl" [options]="options" withSelectAll withSelectAllLabel="lol" [totalCount]="options.length" /> `,
})
class MultiSelectFormControlHostComponent {
	formControl = new FormControl<LuMultiSelection<TestEntity>>({ mode: 'none' }, { nonNullable: true });

	options: TestEntity[] = options;
}

describe('LuMultiSelectInputComponent', () => {
	let fixture: ComponentFixture<LuMultiSelectInputComponent<Entity>>;
	let searchControl: FormControl;

	beforeEach(() => {
		searchControl = new FormControl();

		TestBed.configureTestingModule({
			imports: [LuMultiSelectInputComponent, MultiSelectFormControlHostComponent, MultiSelectNgModelHostComponent],
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

				jest.spyOn(hostComponent, 'setSelectedOptions');

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

				const onChange = jest.fn();
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
				componentInstance.registerOnChange((value) => emittedSelectValues.push(value));

				componentInstance.options = options;

				fixture.componentRef.setInput('totalCount', options.length);
				fixture.componentRef.setInput('withSelectAllDisplayerLabel', 'Displayer Label');
				fixture.detectChanges();
			});

			it('should not emit value on init', async () => {
				// Arrange
				const { componentInstance } = fixture;
				componentInstance.openPanel();
				await waitForPanel();
				componentInstance.panelRef.changeDetectorRef.detectChanges();

				// Act
				TestBed.flushEffects();

				// Assert
				expect(emittedSelectValues).toEqual([]);
			});

			it('should emit all when clicking on select all while selection was empty', async () => {
				// Arrange
				const { componentInstance } = fixture;
				componentInstance.openPanel();
				await waitForPanel();
				componentInstance.panelRef.changeDetectorRef.detectChanges();

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
				await waitForPanel();
				componentInstance.panelRef.changeDetectorRef.detectChanges();

				// Act
				selectAllDirective.setSelectAll(true);
				TestBed.flushEffects();
				componentInstance.panelRef.emitValue([options[0]]);
				TestBed.flushEffects();

				// Assert
				expect(emittedSelectValues).toEqual([{ mode: 'all' }, { mode: 'exclude', values: [options[0]] }]);
			});

			it('should emit mode include when clicking on select all then selecting option', async () => {
				// Arrange
				const { componentInstance } = fixture;
				componentInstance.openPanel();
				await waitForPanel();
				componentInstance.panelRef.changeDetectorRef.detectChanges();

				// Act
				componentInstance.panelRef.emitValue([options[0]]);
				TestBed.flushEffects();

				// Assert
				expect(emittedSelectValues).toEqual([{ mode: 'include', values: [options[0]] }]);
			});

			it('should set "all" selection when clicking on select all with included option', async () => {
				// Arrange
				const { componentInstance } = fixture;
				componentInstance.openPanel();
				await waitForPanel();
				componentInstance.panelRef.changeDetectorRef.detectChanges();

				// Act
				componentInstance.panelRef.emitValue([options[0]]);
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
				await waitForPanel();
				componentInstance.panelRef.changeDetectorRef.detectChanges();

				// Act
				selectAllDirective.setSelectAll(true);
				TestBed.flushEffects();
				componentInstance.panelRef.emitValue([options[0]]);
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
				await waitForPanel();
				componentInstance.panelRef.changeDetectorRef.detectChanges();

				// Act
				componentInstance.panelRef.emitValue(options);
				TestBed.flushEffects();

				// Assert
				expect(emittedSelectValues).toEqual([{ mode: 'all' }]);
			});

			it('should emit "none" selection when clicking on select all then clear', async () => {
				// Arrange
				const { componentInstance } = fixture;
				componentInstance.openPanel();
				await waitForPanel();
				componentInstance.panelRef.changeDetectorRef.detectChanges();

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
				await waitForPanel();
				componentInstance.panelRef.changeDetectorRef.detectChanges();

				// Act
				selectAllDirective.setSelectAll(true);
				TestBed.flushEffects();
				componentInstance.panelRef.emitValue(options);
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
	});
});

function createComponent(override?: MetadataOverride<Component>) {
	if (override) {
		TestBed.overrideComponent(LuMultiSelectInputComponent, override);
	}

	return TestBed.createComponent<LuMultiSelectInputComponent<Entity>>(LuMultiSelectInputComponent);
}

function waitForPanel() {
	return new Promise((resolve) => setTimeout(resolve, 11));
}
