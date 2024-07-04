import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, forwardRef, inject, input, LOCALE_ID, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { getIntl, IntlParamsPipe } from '@lucca-front/ng/core';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { TextInputComponent } from '../text-input/text-input.component';
import { LU_I18n_TEXT_INPUT_TRANSLATIONS } from './i18n-text-input.translate';
import { I18nTranslation } from './model/i18n-translation';

@Component({
	selector: 'lu-i18n-text-input',
	standalone: true,
	imports: [FormFieldComponent, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet, PopoverDirective, TextInputComponent, FormFieldComponent, FormsModule, InputDirective, IntlParamsPipe],
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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class I18nTextInputComponent implements ControlValueAccessor {
	#localeId = inject(LOCALE_ID);

	#intlDisplay = new Intl.DisplayNames([this.#localeId], { type: 'language' });

	intl = getIntl(LU_I18n_TEXT_INPUT_TRANSLATIONS);

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

	getLocaleDisplayName(locale: string): string {
		return this.#intlDisplay.of(locale);
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
