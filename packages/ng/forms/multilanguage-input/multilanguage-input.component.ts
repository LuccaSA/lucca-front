import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, LOCALE_ID, model, output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { FormValueControl } from '@angular/forms/signals';
import { intlInputOptions, IntlParamsPipe, luBooleanAttribute } from '@lucca-front/ng/core';
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

	readonly intl = input(...intlInputOptions(LU_MULTILANGUAGE_INPUT_TRANSLATIONS));

	readonly formFieldRef = inject(FORM_FIELD_INSTANCE, { optional: true });

	readonly formFieldSize = this.formFieldRef?.size;

	readonly value = model<MultilanguageTranslation[]>([]);

	readonly disabled = input(false, { transform: luBooleanAttribute });

	readonly touch = output<void>();

	readonly placeholder = input('');

	readonly openOnFocus = input(false, { transform: luBooleanAttribute });

	readonly autocomplete = input<AutoFill>('off');

	readonly hasNoInvariant = input(false, { transform: luBooleanAttribute });

	readonly hasAIButtons = input(false, { transform: luBooleanAttribute });

	readonly displayLocale = input('');

	readonly translateWithAI = output<string>();

	readonly shouldOpenOnFocus = computed(() => this.openOnFocus() || this.hasNoInvariant());

	readonly #translations = computed(() => this.value() ?? []);

	// Resolves the culture code to display: an exact match on `displayLocale` if there is one,
	// otherwise a match on the language part only (e.g. `displayLocale` `en-US` matches a row `en`).
	readonly displayCultureCode = computed(() => {
		if (!this.hasNoInvariant()) {
			return INVARIANT_CULTURE_CODE;
		}
		const displayLocale = this.displayLocale();
		const rows = this.#translations();
		if (rows.some((row) => row.cultureCode === displayLocale)) {
			return displayLocale;
		}
		const language = displayLocale.split('-')[0];
		return rows.find((row) => row.cultureCode.split('-')[0] === language)?.cultureCode ?? displayLocale;
	});

	readonly displayRow = computed(() => {
		return this.#translations().find((row) => row.cultureCode === this.displayCultureCode()) || { value: '', required: false, cultureCode: this.displayCultureCode() };
	});

	readonly cultureCodeDisplay = computed(() => {
		return this.displayLocale().split('-')[0]?.toUpperCase();
	});

	readonly panelInputs = computed(() => {
		return this.#translations().filter((row) => row.cultureCode !== INVARIANT_CULTURE_CODE && (!this.hasNoInvariant() || row.cultureCode !== this.displayCultureCode()));
	});

	readonly presentationValue = computed(() => {
		if (this.hasNoInvariant()) {
			return this.displayRow()?.value;
		}
		return this.#translations().find((row) => row.cultureCode === this.#localeId)?.value || this.displayRow()?.value;
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

	protected hasCulture(cultureCode: string): boolean {
		return cultureCode.includes('-');
	}

	protected getPopoverInlineSizeRem(inputElement: HTMLInputElement): number {
		const inputContainer = inputElement.closest('.textField-input');
		const inputContainerInlineSize = (inputContainer instanceof HTMLElement ? inputContainer : inputElement).getBoundingClientRect().width;

		// Add to the inline size of the input container (converted from px to rem):
		// 2.75rem, which corresponds to the width of the prefix before the field when in "no invariant" mode
		// 0.5rem, which corresponds to the offset needed to make the poppover slightly wider than the input container
		return this.hasNoInvariant() ? inputContainerInlineSize / 16 + 2.75 + 0.5 : inputContainerInlineSize / 16 + 0.5;
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
