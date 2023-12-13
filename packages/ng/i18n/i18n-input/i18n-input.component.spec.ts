import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LuI18nPanelComponent } from './i18n-panel/i18n-panel.component';
import { LuI18nInputComponent } from './i18n-input.component';
import { I18nTranslation } from './i18n-panel/i18n-translation.model';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuPopoverModule } from '@lucca-front/ng/popover';
import spyOn = jest.spyOn;

@Component({
	selector: 'lu-test',
	template: ` <button luI18nInput id="test" cancelLabel="Cancel" submitLabel="Submit" [(ngModel)]="translations"></button>`,
	standalone: true,
	imports: [FormsModule, LuI18nInputComponent],
})
export class TestComponent {
	@ViewChild(LuI18nInputComponent)
	inputComponent: LuI18nInputComponent;

	translations = [];
}

describe('LuI18nInputComponent', () => {
	let component: LuI18nInputComponent;
	let testComponent: TestComponent;
	let fixture: ComponentFixture<TestComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LuI18nPanelComponent, LuI18nInputComponent, LuPopoverModule, NoopAnimationsModule, TestComponent],
		}).compileComponents();
	});

	beforeEach(async () => {
		fixture = TestBed.createComponent(TestComponent);
		testComponent = fixture.componentInstance;
		fixture.detectChanges();
		await fixture.whenStable();
		component = testComponent.inputComponent;
	});

	describe(`#init`, () => {
		it(`should create component`, () => {
			expect(component).toBeDefined();
		});

		it(`should init target`, () => {
			expect(component.target).toBeDefined();
			expect(component.target.overlap).toEqual(true);
			expect(component.target.position).toEqual('below');
			expect(component.target.alignment).toEqual('left');
			expect(component.target.elementRef).toBeDefined();
		});

		it(`should init click event listener to open popover`, () => {
			const spy = spyOn(component, 'openPopover');

			const element = document.getElementById('test');
			element.click();
			expect(spy).toHaveBeenCalled();
		});

		it(`should init listener if no parent formcontrol`, () => {
			const fixture = TestBed.createComponent(LuI18nInputComponent);
			expect(() => fixture.componentInstance.closePopover(true)).not.toThrow();
			expect(() => fixture.componentInstance.closePopover()).not.toThrow();
		});
	});

	describe(`#writeValue`, () => {
		let inputValues: I18nTranslation[];

		beforeEach(() => {
			inputValues = [
				{
					value: 'value1',
					cultureName: 'cultureName1',
					required: true,
					cultureCode: 'cultureCode1',
					cultureIcon: 'filter',
				},
				{
					value: 'value2',
					cultureName: 'cultureName2',
					required: true,
					cultureCode: 'cultureCode2',
					cultureIcon: 'filter',
				},
			];
			component.writeValue(inputValues);
		});

		it(`should copy translations into component`, () => {
			expect(component.translations).toEqual(inputValues);
		});

		it(`should assign form control values`, () => {
			expect(component.formControl.value).toEqual(inputValues);
		});
	});

	describe(`#submit`, () => {
		let formValue: I18nTranslation[];
		beforeEach(() => {
			formValue = [
				{
					value: 'value',
					cultureName: 'cultureName',
					required: true,
					cultureCode: 'cultureCode',
					cultureIcon: 'filter',
				},
			];
			component.formControl.setValue(formValue);
		});

		it(`should assign panel values`, () => {
			component.closePopover(true);
			expect(component.translations).toEqual(formValue);
		});

		it(`should call change listener`, () => {
			const mockChange = jest.fn();
			component.registerOnChange(mockChange);
			component.closePopover(true);
			expect(mockChange).toHaveBeenCalledWith(formValue);
		});

		it(`should mark form as pristine`, () => {
			component.closePopover(true);
			expect(component.formControl.dirty).toBe(false);
		});
	});

	describe(`#dismiss`, () => {
		let formValue: I18nTranslation[];
		beforeEach(() => {
			component.translations = [
				{
					value: '',
					cultureName: 'cultureName',
					required: true,
					cultureCode: 'cultureCode',
					cultureIcon: 'filter',
				},
			];

			formValue = [
				{
					...component.translations[0],
					value: '',
				},
			];
			component.formControl.setValue(formValue);
		});

		it(`should reset panel values`, () => {
			component.closePopover();
			expect(component.formControl.value).toEqual(component.translations);
		});

		it(`should call touch listener`, () => {
			const mockTouched = jest.fn();
			component.registerOnTouched(mockTouched);
			component.closePopover();
			expect(mockTouched).toHaveBeenCalled();
		});

		it(`should mark form as pristine`, () => {
			component.closePopover();
			expect(component.formControl.dirty).toBe(false);
		});
	});

	describe(`#_emitOpen`, () => {
		it(`should emit open event`, () => {
			const spy = spyOn(component.onOpen, 'emit');
			component.openPopover();
			expect(spy).toHaveBeenCalled();
		});
	});

	describe(`#_emitClose`, () => {
		it(`should emit close event`, waitForAsync(() => {
			const spy = spyOn(component.onClose, 'emit');
			// can't seem to be able to check close emission when calling closePopover(). Timing issue?
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
			(component as any)._emitClose();
			expect(spy).toHaveBeenCalled();
		}));
	});
});
