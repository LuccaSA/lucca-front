import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { ALuPopoverTrigger, LuPopoverPanelComponent, LuPopoverTarget } from '@lucca-front/ng/popover';
import { Overlay } from '@angular/cdk/overlay';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuI18nPanelComponent } from './i18n-panel/i18n-panel.component';
import { I18nTranslation } from './i18n-panel/i18n-translation.model';
import { CommonModule } from '@angular/common';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[luI18nInput]',
	templateUrl: './i18n-input.component.html',
	styleUrls: ['i18n-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	encapsulation: ViewEncapsulation.None,
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
	imports: [CommonModule, LuPopoverPanelComponent, LuI18nPanelComponent, ButtonComponent, ReactiveFormsModule],
})
export class LuI18nInputComponent extends ALuPopoverTrigger<LuPopoverPanelComponent> implements ControlValueAccessor, Validator {
	@Output()
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	onOpen: EventEmitter<void> = new EventEmitter<void>();

	@Output()
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	onClose: EventEmitter<void> = new EventEmitter<void>();

	@HostListener('click')
	public override openPopover(): void {
		super.openPopover();
	}

	@ViewChild(LuPopoverPanelComponent)
	public override set panel(panel: LuPopoverPanelComponent) {
		super.panel = panel;
	}

	@Input({ required: true })
	public submitLabel: string;

	@Input({ required: true })
	public cancelLabel: string;

	public override get panel() {
		return super.panel;
	}

	public formControl = new FormControl<I18nTranslation[]>([]);
	public translations?: I18nTranslation[] = [];
	#onChange: (translations: I18nTranslation[]) => void = () => {};
	#onTouched: () => void = () => {};

	constructor(overlay: Overlay, elementRef: ElementRef<HTMLElement>, viewContainerRef: ViewContainerRef) {
		super(overlay, elementRef, viewContainerRef);
		this.target = new LuPopoverTarget();
		this.target.elementRef = elementRef;
		this.target.overlap = true;
		this.target.position = 'below';
		this.target.alignment = 'left';
	}

	public override closePopover(submit = false) {
		if (!submit) {
			this.formControl.reset(this.translations, { emitEvent: false });
			this.#onTouched();
		} else {
			this.translations = [...this.formControl.value];
			this.formControl.markAsPristine();
			this.#onChange(this.translations);
		}
		super.closePopover();
	}

	protected _emitOpen(): void {
		this.onOpen.emit();
	}

	protected _emitClose(): void {
		this.onClose.emit();
	}

	writeValue(translations?: I18nTranslation[]) {
		this.translations = translations ? translations.map((t) => ({ ...t })) : [];
		this.formControl.setValue(this.translations, { emitEvent: false });
	}

	registerOnChange(onChange: (translations: I18nTranslation[]) => void) {
		this.#onChange = onChange;
	}

	registerOnTouched(onTouched: () => void) {
		this.#onTouched = onTouched;
	}

	validate(): ValidationErrors | null {
		return this.formControl.errors;
	}
}
