import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, forwardRef, inject, input, LOCALE_ID, output, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { intlInputOptions, IntlParamsPipe } from '@lucca-front/ng/core';
import { FORM_FIELD_INSTANCE, FormFieldComponent, InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { ButtonComponent } from '@lucca/prisme/button';
import { IconComponent } from '@lucca/prisme/icon';
import { TextInputComponent } from '../text-input/text-input.component';
import { INVARIANT_CULTURE_CODE, MultilanguageTranslation } from './model/multilanguage-translation';
import { LU_MULTILANGUAGE_INPUT_TRANSLATIONS } from './multilanguage-input.translate';

@Component({
	selector: 'lu-multilanguage-input',
	imports: [
		FormFieldComponent,
		ReactiveFormsModule,
		PopoverDirective,
		TextInputComponent,
		FormFieldComponent,
		FormsModule,
		InputDirective,
		IntlParamsPipe,
		LuTooltipTriggerDirective,
		ɵPresentationDisplayDefaultDirective,
		IconComponent,
		ButtonComponent,
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

	#intlDisplay = new Intl.DisplayNames([this.#localeId], { type: 'language', languageDisplay: 'dialect' });

	readonly intl = input(...intlInputOptions(LU_MULTILANGUAGE_INPUT_TRANSLATIONS));

	readonly formFieldRef = inject(FORM_FIELD_INSTANCE, { optional: true });

	readonly formFieldSize = this.formFieldRef?.size;

	protected onTouched = () => {};

	protected onChange = (_value: MultilanguageTranslation[]) => {};

	readonly placeholder = input('');

	readonly openOnFocus = input(false, { transform: booleanAttribute });

	readonly autocomplete = input<AutoFill>('off');

	readonly hasNoInvariant = input(false, { transform: booleanAttribute });

	readonly hasAIButtons = input(false, { transform: booleanAttribute });

	readonly displayLocale = input('');

	readonly translateWithAI = output<string>();

	readonly shouldOpenOnFocus = computed(() => this.openOnFocus() || this.hasNoInvariant());

	// Suffixed with Internal to avoid conflict with NgModel's disabled attribute
	readonly disabledInternal = signal(false);

	readonly model: WritableSignal<MultilanguageTranslation[]> = signal([] as MultilanguageTranslation[]);

	readonly displayRow = computed(() => {
		if (this.hasNoInvariant()) {
			return this.model().find((row) => row.cultureCode === this.displayLocale()) || { value: '', required: false, cultureCode: this.displayLocale() };
		} else {
			return this.model().find((row) => row.cultureCode === INVARIANT_CULTURE_CODE) || { value: '', required: false, cultureCode: INVARIANT_CULTURE_CODE };
		}
	});

	readonly cultureCodeDisplay = computed(() => {
		return this.displayLocale().split('-')[0]?.toUpperCase();
	});

	readonly panelInputs = computed(() => {
		return this.model().filter((row) => (this.hasNoInvariant() ? row.cultureCode !== this.displayLocale() && row.cultureCode !== INVARIANT_CULTURE_CODE : row.cultureCode !== INVARIANT_CULTURE_CODE));
	});

	readonly presentationValue = computed(() => {
		return this.model().find((row) => row.cultureCode === this.#localeId)?.value || this.displayRow()?.value;
	});

	readonly popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }, 12, 6),
		new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }, 12, -6),
	];

	constructor() {
		effect(() => {
			if (this.hasNoInvariant() && !this.formFieldRef?.isInputRequired()) {
				console.warn('[Multilanguage Input] Input with no invariant should be required, make sure you make the corresponding form field (or NgModel) required.');
			}
			if (this.hasNoInvariant() && !this.displayLocale()) {
				console.warn('[Multilanguage Input] Input with no invariant should have `displayLocale` input filled.');
			}
		});
	}

	getLocaleDisplayName(locale: string): string {
		return this.#intlDisplay.of(locale) ?? locale;
	}

	protected getPopoverInlineSizeRem(inputElement: HTMLInputElement): number {
		const inputContainer = inputElement.closest('.textField-input');
		const referenceWidth = (inputContainer instanceof HTMLElement ? inputContainer : inputElement).getBoundingClientRect().width;

		return referenceWidth / 16 + 1;
	}

	writeValue(value: MultilanguageTranslation[]): void {
		if (!value) {
			value = [];
		}
		if (value.length > 0) {
			if (!this.hasNoInvariant() && !value.some((row) => row.cultureCode === INVARIANT_CULTURE_CODE)) {
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
