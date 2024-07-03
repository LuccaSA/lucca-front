import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, forwardRef, input, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { TextInputComponent } from '../text-input/text-input.component';
import { LU_TEXTFIELD_TRANSLATIONS } from './i18n-text-input.translate';
import { I18nTranslation } from './model/i18n-translation';

@Component({
	selector: 'lu-i18n-text-input',
	standalone: true,
	imports: [FormFieldComponent, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet, PopoverDirective, TextInputComponent, FormFieldComponent, FormsModule, InputDirective],
	templateUrl: './i18n-text-input.component.html',
	styleUrl: './i18n-text-input.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => I18nTextInputComponent),
			multi: true,
		},
	],
	encapsulation: ViewEncapsulation.None,
})
export class I18nTextInputComponent implements ControlValueAccessor {
	intl = getIntl(LU_TEXTFIELD_TRANSLATIONS);

	protected onTouched = () => {};
	protected onChange = (_value: I18nTranslation[]) => {};

	placeholder = input('');

	disabled = signal(false);

	model: WritableSignal<I18nTranslation[]> = signal([] as I18nTranslation[]);

	invariant = computed(() => {
		return this.model().find((row) => row.cultureCode === 'invariant') || { value: '' };
	});

	panelInputs = computed(() => {
		return this.model().filter((row) => row.cultureCode !== 'invariant');
	});

	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }, 16, 6),
		new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }, 16, -6),
	];

	constructor() {
		effect(() => {
			this.onChange?.(this.model());
		});
	}

	writeValue(value: I18nTranslation[]): void {
		if (!value) {
			value = [];
		}
		if (value.length > 0) {
			if (!value.some((row) => row.cultureCode === 'invariant')) {
				throw new Error('Please provide an invariant translation in translation array');
			}
			this.model.set(value);
		}
	}

	registerOnChange(fn: (value: I18nTranslation[]) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}

	valueChange(): void {
		this.onChange?.(this.model());
	}
}
