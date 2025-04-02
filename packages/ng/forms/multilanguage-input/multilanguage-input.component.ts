import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, forwardRef, inject, input, LOCALE_ID, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { getIntl, IntlParamsPipe } from '@lucca-front/ng/core';
import { FORM_FIELD_INSTANCE, FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { TextInputComponent } from '../text-input/text-input.component';
import { MultilanguageTranslation } from './model/multilanguage-translation';
import { LU_MULTILANGUAGE_INPUT_TRANSLATIONS } from './multilanguage-input.translate';

@Component({
	selector: 'lu-multilanguage-input',
	standalone: true,
	imports: [
		FormFieldComponent,
		ReactiveFormsModule,
		FormFieldIdDirective,
		NgTemplateOutlet,
		PopoverDirective,
		TextInputComponent,
		FormFieldComponent,
		FormsModule,
		InputDirective,
		IntlParamsPipe,
		LuTooltipTriggerDirective,
	],
	templateUrl: './multilanguage-input.component.html',
	styleUrl: './multilanguage-input.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MultilanguageInputComponent),
			multi: true,
		},
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultilanguageInputComponent implements ControlValueAccessor {
	#localeId = inject(LOCALE_ID);

	#intlDisplay = new Intl.DisplayNames([this.#localeId], { type: 'language' });

	intl = getIntl(LU_MULTILANGUAGE_INPUT_TRANSLATIONS);

	#formFieldRef = inject(FORM_FIELD_INSTANCE);

	formFieldSize = this.#formFieldRef.size;

	protected onTouched = () => {};

	protected onChange = (_value: MultilanguageTranslation[]) => {};

	placeholder = input('');

	// Suffixed with Internal to avoid conflict with NgModel's disabled attribute
	disabledInternal = signal(false);

	model: WritableSignal<MultilanguageTranslation[]> = signal([] as MultilanguageTranslation[]);

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

	writeValue(value: MultilanguageTranslation[]): void {
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

	registerOnChange(fn: (value: MultilanguageTranslation[]) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabledInternal.set(isDisabled);
	}

	valueChange(): void {
		this.onChange?.(this.model());
	}
}
