import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { I18nTranslation } from './i18n-translation.model';
import { IconComponent } from '@lucca-front/ng/icon';
import { CommonModule } from '@angular/common';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { translationsValidator } from './i18n-translation.validator';

@Component({
	selector: 'lu-i18n-panel',
	templateUrl: './i18n-panel.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['i18n-panel.component.scss'],
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuI18nPanelComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => LuI18nPanelComponent),
			multi: true,
		},
	],
	imports: [IconComponent, CommonModule, FormsModule, LuTooltipModule],
})
export class LuI18nPanelComponent implements ControlValueAccessor, Validator {
	public translations: I18nTranslation[] = [];
	public isDisabled = false;

	public onChange: (value: I18nTranslation[]) => void = () => {};
	public onTouched: () => void = () => {};

	private readonly changeDetectorRef = inject(ChangeDetectorRef);

	writeValue(translations?: I18nTranslation[]): void {
		this.translations = translations ? translations.map((t) => ({ ...t })) : [];
		this.changeDetectorRef.markForCheck();
	}

	registerOnChange(onChange: (value: I18nTranslation[]) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	setDisabledState(isDisabled: boolean) {
		this.isDisabled = isDisabled;
	}

	validate(): ValidationErrors | null {
		return translationsValidator(this.translations);
	}
}
