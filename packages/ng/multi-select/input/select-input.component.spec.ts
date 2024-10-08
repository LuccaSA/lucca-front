import { Component } from '@angular/core';
import { ComponentFixture, MetadataOverride, TestBed } from '@angular/core/testing';
import { FormControl, NgControl } from '@angular/forms';
import { LuCoreSelectTotalCountDirective } from '@lucca-front/ng/core-select';
import { TestEntity, runALuSelectInputComponentTestSuite } from '../../core-select/input/select-input.component.spec';
import { LuMultiSelectWithSelectAllValue } from '../select.model';
import { LuMultiSelectWithSelectAllDirective } from './select-all';
import { LuMultiSelectInputComponent } from './select-input.component';

type Entity = { id: number; name: string };

describe('LuMultiSelectInputComponent', () => {
	let fixture: ComponentFixture<LuMultiSelectInputComponent<Entity>>;
	let searchControl: FormControl;

	beforeEach(() => {
		searchControl = new FormControl();

		TestBed.configureTestingModule({
			imports: [LuMultiSelectInputComponent],
			providers: [
				// The input inside the displayer needs a NgControl
				{
					provide: NgControl,
					useValue: searchControl,
				},
			],
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
		let emittedSelectValues: Array<LuMultiSelectWithSelectAllValue<TestEntity> | TestEntity[]>;

		const options = [
			{ id: 1, name: 'test 1' },
			{ id: 2, name: 'test 2' },
			{ id: 3, name: 'test 3' },
			{ id: 4, name: 'test 4' },
			{ id: 5, name: 'test 5' },
		];

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

		it('should not emit value on init', () => {
			// Arrange
			const { componentInstance } = fixture;
			componentInstance.openPanel();
			componentInstance.panelRef.changeDetectorRef.detectChanges();

			// Act
			TestBed.flushEffects();

			// Assert
			expect(emittedSelectValues).toEqual([]);
		});

		it('should not emit when clicking on select all while selection was empty', () => {
			// Arrange
			const { componentInstance } = fixture;
			componentInstance.openPanel();
			componentInstance.panelRef.changeDetectorRef.detectChanges();

			// Act
			selectAllDirective.setSelectAll(true);
			TestBed.flushEffects();

			// Assert
			expect(emittedSelectValues).toEqual([]);
		});

		it('should emit mode exclude when clicking on select all then selecting option', () => {
			// Arrange
			const { componentInstance } = fixture;
			componentInstance.openPanel();
			componentInstance.panelRef.changeDetectorRef.detectChanges();

			// Act
			selectAllDirective.setSelectAll(true);
			TestBed.flushEffects();
			componentInstance.panelRef.emitValue([options[0]]);
			TestBed.flushEffects();

			// Assert
			expect(emittedSelectValues).toEqual([{ mode: 'exclude', values: [options[0]] }]);
		});

		it('should emit mode include when clicking on select all then selecting option', () => {
			// Arrange
			const { componentInstance } = fixture;
			componentInstance.openPanel();
			componentInstance.panelRef.changeDetectorRef.detectChanges();

			// Act
			componentInstance.panelRef.emitValue([options[0]]);
			TestBed.flushEffects();

			// Assert
			expect(emittedSelectValues).toEqual([{ mode: 'include', values: [options[0]] }]);
		});

		it('should reset selection when clicking on select all with included option', () => {
			// Arrange
			const { componentInstance } = fixture;
			componentInstance.openPanel();
			componentInstance.panelRef.changeDetectorRef.detectChanges();

			// Act
			componentInstance.panelRef.emitValue([options[0]]);
			TestBed.flushEffects();
			selectAllDirective.setSelectAll(true);
			TestBed.flushEffects();

			// Assert
			expect(emittedSelectValues).toEqual([{ mode: 'include', values: [options[0]] }, { mode: 'all' }]);
		});

		it('should reset selection when clicking on select all with excluded option', () => {
			// Arrange
			const { componentInstance } = fixture;
			componentInstance.openPanel();
			componentInstance.panelRef.changeDetectorRef.detectChanges();

			// Act
			selectAllDirective.setSelectAll(true);
			TestBed.flushEffects();
			componentInstance.panelRef.emitValue([options[0]]);
			TestBed.flushEffects();
			selectAllDirective.setSelectAll(false);
			TestBed.flushEffects();

			// Assert
			expect(emittedSelectValues).toEqual([{ mode: 'exclude', values: [options[0]] }, { mode: 'all' }]);
		});

		it('should emit mode all when clicking on each option', () => {
			const { componentInstance } = fixture;
			componentInstance.openPanel();
			componentInstance.panelRef.changeDetectorRef.detectChanges();

			// Act
			componentInstance.panelRef.emitValue(options);
			TestBed.flushEffects();

			// Assert
			expect(emittedSelectValues).toEqual([{ mode: 'all' }]);
		});

		it('should convert array of options to selection', () => {
			// Arrange
			const { componentInstance } = fixture;

			// Act
			componentInstance.writeValue([options[0]]);
			TestBed.flushEffects();

			// Assert
			expect(emittedSelectValues).toEqual([
				{
					mode: 'include',
					values: [options[0]],
				},
			]);
		});
	});
});

function createComponent(override?: MetadataOverride<Component>) {
	if (override) {
		TestBed.overrideComponent(LuMultiSelectInputComponent, override);
	}

	return TestBed.createComponent<LuMultiSelectInputComponent<Entity>>(LuMultiSelectInputComponent);
}
