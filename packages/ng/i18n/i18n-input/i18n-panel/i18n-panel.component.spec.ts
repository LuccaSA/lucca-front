import { LuI18nPanelComponent } from './i18n-panel.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { I18nTranslation } from './i18n-translation.model';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'lu-test',
	template: ` <lu-i18n-panel [(ngModel)]="translations"></lu-i18n-panel>`,
	standalone: true,
	imports: [FormsModule, LuI18nPanelComponent],
})
export class TestComponent {
	@ViewChild(LuI18nPanelComponent)
	panel: LuI18nPanelComponent;

	translations = [];
}

describe('LuI18nPanelComponent', () => {
	let component: LuI18nPanelComponent;
	let testComponent: TestComponent;
	let fixture: ComponentFixture<TestComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestComponent, NoopAnimationsModule, OverlayModule],
		}).compileComponents();
	});

	beforeEach(async () => {
		fixture = TestBed.createComponent(TestComponent);
		testComponent = fixture.componentInstance;
		fixture.detectChanges();
		await fixture.whenStable();
		component = testComponent.panel;
	});

	describe(`#init`, () => {
		it(`should create component`, () => {
			expect(component).toBeDefined();
		});

		it(`should be enabled by default`, () => {
			expect(component.isDisabled).toBe(false);
		});

		it(`should init listener if no parent formcontrol`, () => {
			const fixture = TestBed.createComponent(LuI18nPanelComponent);
			expect(() => fixture.componentInstance.onChange([])).not.toThrow();
			expect(() => fixture.componentInstance.onTouched()).not.toThrow();
		});
	});

	describe(`#writeValue`, () => {
		it(`should copy and assign given translations to the component`, () => {
			const inputValue: I18nTranslation[] = [
				{
					value: 'value1',
					cultureCode: 'cultureCode1',
					cultureIcon: 'filter',
					required: true,
					cultureName: 'cultureName1',
				},
				{
					value: 'value2',
					cultureCode: 'cultureCode2',
					cultureIcon: 'error',
					required: true,
					cultureName: 'cultureName2',
				},
			];

			component.writeValue(inputValue);
			expect(component.translations).toEqual(inputValue);
		});

		it(`should assign empty array if no translations are given`, () => {
			component.writeValue(undefined);
			expect(component.translations).toEqual([]);
		});
	});

	describe(`#registerOnChange`, () => {
		it('should assign change listener', () => {
			const listener = () => {};

			component.registerOnChange(listener);
			expect(component.onChange).toEqual(listener);
		});
	});

	describe(`#registerOnTouched`, () => {
		it('should assign change listener', () => {
			const listener = () => {};

			component.registerOnTouched(listener);
			expect(component.onTouched).toEqual(listener);
		});
	});

	describe(`#setDisabledState`, () => {
		it('should set the component disabled state', () => {
			component.setDisabledState(true);
			expect(component.isDisabled).toEqual(true);
		});
	});

	describe(`#validate`, () => {
		it('should return null if no translation is provided', () => {
			component.translations = undefined;
			expect(component.validate()).toEqual(null);
		});

		it('should return null if all required fields are filled', () => {
			component.translations = [
				{
					value: '',
					cultureCode: 'cultureCode1',
					cultureIcon: 'filter',
					required: false,
					cultureName: 'cultureName1',
				},
				{
					value: 'value2',
					cultureCode: 'cultureCode2',
					cultureIcon: 'error',
					required: true,
					cultureName: 'cultureName2',
				},
				{
					value: '',
					cultureCode: 'cultureCode2',
					cultureIcon: 'error',
					required: false,
					cultureName: 'cultureName2',
				},
			];
			expect(component.validate()).toEqual(null);
		});

		it('should return an error if any required field is not filled', () => {
			component.translations = [
				{
					value: '',
					cultureCode: 'cultureCode1',
					cultureIcon: 'filter',
					required: false,
					cultureName: 'cultureName1',
				},
				{
					value: 'value2',
					cultureCode: 'cultureCode2',
					cultureIcon: 'error',
					required: true,
					cultureName: 'cultureName2',
				},
				{
					value: '',
					cultureCode: 'cultureCode2',
					cultureIcon: 'error',
					required: true,
					cultureName: 'cultureName2',
				},
			];
			expect(component.validate()).toEqual({
				required: true,
			});
		});
	});
});
