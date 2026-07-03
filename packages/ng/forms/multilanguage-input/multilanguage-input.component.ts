import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, inject, input, LOCALE_ID, model, output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { FormValueControl } from '@angular/forms/signals';
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
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultilanguageInputComponent implements FormValueControl<MultilanguageTranslation[]> {
	#localeId = inject(LOCALE_ID);

	#intlDisplay = new Intl.DisplayNames([this.#localeId], { type: 'language', languageDisplay: 'dialect' });

	intl = input(...intlInputOptions(LU_MULTILANGUAGE_INPUT_TRANSLATIONS));

	protected formFieldRef = inject(FORM_FIELD_INSTANCE);

	formFieldSize = this.formFieldRef.size;

	readonly value = model<MultilanguageTranslation[]>([]);

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly touch = output<void>();

	placeholder = input('');

	openOnFocus = input(false, { transform: booleanAttribute });

	autocomplete = input<AutoFill>('off');

	hasNoInvariant = input(false, { transform: booleanAttribute });

	hasAIButtons = input(false, { transform: booleanAttribute });

	displayLocale = input('');

	translateWithAI = output<string>();

	shouldOpenOnFocus = computed(() => this.openOnFocus() || this.hasNoInvariant());

	readonly #translations = computed(() => this.value() ?? []);

	displayRow = computed(() => {
		if (this.hasNoInvariant()) {
			return this.#translations().find((row) => row.cultureCode === this.displayLocale()) || { value: '', required: false, cultureCode: this.displayLocale() };
		} else {
			return this.#translations().find((row) => row.cultureCode === INVARIANT_CULTURE_CODE) || { value: '', required: false, cultureCode: INVARIANT_CULTURE_CODE };
		}
	});

	cultureCodeDisplay = computed(() => {
		return this.displayLocale().split('-')[0]?.toUpperCase();
	});

	panelInputs = computed(() => {
		return this.#translations().filter((row) => (this.hasNoInvariant() ? row.cultureCode !== this.displayLocale() && row.cultureCode !== INVARIANT_CULTURE_CODE : row.cultureCode !== INVARIANT_CULTURE_CODE));
	});

	presentationValue = computed(() => {
		return this.#translations().find((row) => row.cultureCode === this.#localeId)?.value || this.displayRow()?.value;
	});

	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }, 12, 6),
		new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }, 12, -6),
	];

	constructor() {
		effect(() => {
			if (this.hasNoInvariant() && !this.formFieldRef.isInputRequired()) {
				console.warn('[Multilanguage Input] Input with no invariant should be required, make sure you make the corresponding form field (or NgModel) required.');
			}
			if (this.hasNoInvariant() && !this.displayLocale()) {
				console.warn('[Multilanguage Input] Input with no invariant should have `displayLocale` input filled.');
			}
		});
		effect(() => {
			const translations = this.#translations();
			if (translations.length > 0 && !this.hasNoInvariant() && !translations.some((row) => row.cultureCode === INVARIANT_CULTURE_CODE)) {
				throw new Error('Please provide an invariant translation in translation array');
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

	updateRowValue(cultureCode: string, newValue: string): void {
		const translations = this.#translations();
		if (translations.some((row) => row.cultureCode === cultureCode)) {
			this.value.set(translations.map((row) => (row.cultureCode === cultureCode ? { ...row, value: newValue } : row)));
		} else {
			this.value.set([...translations, { cultureCode, value: newValue }]);
		}
	}
}
