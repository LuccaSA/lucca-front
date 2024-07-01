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
	template: ` <lu-i18n-textfield [(ngModel)]="translations" label="Label"> </lu-i18n-textfield>`,
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

		it(`should listen to internal value changes`, waitForAsync(() => {
			const spy = jest.fn();
			component.registerOnChange(spy);
			const translations = [
				{
					value: 'value1',
					current: true,
					cultureCode: 'cultureCode1',
					required: false,
					cultureName: 'cultureName1',
				},
				{
					value: 'value2',
					current: false,
					cultureCode: 'cultureCode2',
					required: false,
					cultureName: 'cultureName2',
				},
			];
			component.writeValue(translations);
			component.formGroup.patchValue({
				currentTranslation: null,
			});
			expect(spy).toHaveBeenCalledWith([translations[1], { ...translations[0], value: null }]);
		}));

		it(`should init listener if no parent formcontrol`, () => {
			const compFixture = TestBed.createComponent(LuI18nInputComponent);
			const compInstance = compFixture.componentInstance;
			compFixture.detectChanges();
			compInstance.formGroup.patchValue({
				currentTranslation: 'test',
			});
			expect(() => compInstance.closePopover(new Event('click'))).not.toThrow();
		});
	});

	describe(`#openPopover`, () => {
		it(`should show the popover`, () => {
			component.showPopover = false;
			const event = new Event('click');
			component.openPopover(event);
			expect(component.showPopover).toBe(true);
		});

		it(`should call event.preventDefault`, () => {
			const event = new Event('click');
			const spy = spyOn(event, 'preventDefault');

			component.openPopover(event);
			expect(spy).toHaveBeenCalled();
		});
	});

	describe(`#closePopover`, () => {
		it(`should hide the popover`, () => {
			component.showPopover = true;
			const event = new Event('click');
			component.closePopover(event);
			expect(component.showPopover).toBe(false);
		});

		it(`should call event.stopImmediatePropagation`, () => {
			const event = new Event('click');
			const spy = spyOn(event, 'stopImmediatePropagation');

			component.closePopover(event);
			expect(spy).toHaveBeenCalled();
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
				},
				{
					value: 'value2',
					cultureName: 'cultureName2',
					required: true,
					cultureCode: 'cultureCode2',
					current: true,
				},
				{
					value: 'value3',
					cultureName: 'cultureName3',
					required: true,
					cultureCode: 'cultureCode3',
				},
			];
		});

		it(`should assign translations and single current translation`, () => {
			component.writeValue(inputValues);
			expect(component.formGroup.value.currentTranslation).toEqual(inputValues[1].value);
			expect(component.formGroup.value.translations).toEqual(inputValues.filter((t) => !t.current));
		});

		it(`should assign first current translation if multiple are provided`, () => {
			inputValues[0].current = true;
			component.writeValue(inputValues);
			expect(component.formGroup.value.currentTranslation).toEqual(inputValues[0].value);
			expect(component.formGroup.value.translations).toEqual(inputValues.filter((t) => !t.current));
		});

		it(`should assign empty values if no translation is provided`, () => {
			component.writeValue();
			expect(component.formGroup.value.currentTranslation).toEqual('');
			expect(component.formGroup.value.translations).toEqual([]);
		});
	});

	describe(`#validate`, () => {
		let inputValues: I18nTranslation[];

		beforeEach(() => {
			inputValues = [
				{
					value: 'value1',
					cultureName: 'cultureName1',
					required: true,
					cultureCode: 'cultureCode1',
				},
				{
					value: 'value2',
					cultureName: 'cultureName2',
					required: true,
					cultureCode: 'cultureCode2',
					current: true,
				},
				{
					value: 'value3',
					cultureName: 'cultureName3',
					required: false,
					cultureCode: 'cultureCode3',
				},
			];
		});

		it(`should return validation errors if currentTranslation is required and not defined`, () => {
			inputValues[1].value = '';
			component.writeValue(inputValues);
			expect(component.validate()).toEqual({
				required: true,
			});
		});

		it(`should return validation errors if any other translation is required and not defined`, () => {
			inputValues[0].value = '';
			component.writeValue(inputValues);
			component.openPopover(new Event('click'));
			expect(component.validate()).toEqual({
				required: true,
			});
		});
	});
});
