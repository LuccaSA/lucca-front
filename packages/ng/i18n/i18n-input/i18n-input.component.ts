import { ChangeDetectionStrategy, Component, DestroyRef, forwardRef, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { LuPopoverModule } from '@lucca-front/ng/popover';
import { LuI18nPanelComponent } from './i18n-panel/i18n-panel.component';
import { I18nTranslation } from './i18n-panel/i18n-translation.model';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@lucca-front/ng/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { translationsValidator } from './i18n-panel/i18n-translation.validator';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';

@Component({
	selector: 'lu-i18n-textfield',
	templateUrl: './i18n-input.component.html',
	styleUrls: ['i18n-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuI18nInputComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => LuI18nInputComponent),
			multi: true,
		},
	],
	imports: [CommonModule, LuPopoverModule, LuI18nPanelComponent, ReactiveFormsModule, IconComponent, LuTooltipModule, OverlayModule, A11yModule],
})
export class LuI18nInputComponent implements ControlValueAccessor, Validator, OnInit {
	readonly #destroyRef = inject(DestroyRef);
	#onChange: (translations: I18nTranslation[]) => void = () => {};

	protected onTouched: () => void = () => {};

	@Input() public label?: string;
	@Input() public placeholder: string = '';

	public formGroup = new FormGroup({
		translations: new FormControl<I18nTranslation[]>([]),
		currentTranslation: new FormControl<string>(null),
	});

	public currentTranslation?: I18nTranslation;
	public showPopover = false;

	constructor() {
		this.formGroup.controls.currentTranslation.setValidators((control: AbstractControl<string>) => {
			return (this.currentTranslation?.required && !control.value && { required: true }) || translationsValidator(this.formGroup.controls.translations.value);
		});
	}
	ngOnInit() {
		this.formGroup.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((value) => {
			this.#onChange([...value.translations, { ...this.currentTranslation, value: value.currentTranslation }]);
		});
	}

	public openPopover(event: Event) {
		event.preventDefault();
		this.showPopover = true;
	}

	public closePopover(event: Event) {
		event.stopImmediatePropagation();
		this.showPopover = false;
		this.formGroup.controls.currentTranslation.markAsTouched();
		this.onTouched();
	}

	public writeValue(translations?: I18nTranslation[]) {
		let controlTranslations: I18nTranslation[] = [];
		if (translations) {
			controlTranslations = translations.filter((t) => !t.current);
			this.currentTranslation = translations.find((t) => t.current) || translations[0];
		} else {
			this.currentTranslation = undefined;
		}

		this.formGroup.setValue(
			{
				translations: controlTranslations,
				currentTranslation: this.currentTranslation?.value ?? '',
			},
			{ emitEvent: false },
		);
	}

	registerOnChange(onChange: (translations: I18nTranslation[]) => void) {
		this.#onChange = onChange;
	}

	registerOnTouched(onTouched: () => void) {
		this.onTouched = onTouched;
	}

	validate(): ValidationErrors | null {
		// Invalidate the main field if popover is invalid
		this.formGroup.controls.currentTranslation.updateValueAndValidity({ emitEvent: false });
		return this.formGroup.controls.currentTranslation.errors;
	}
}
