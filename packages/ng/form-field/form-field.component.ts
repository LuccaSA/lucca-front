import { NgTemplateOutlet } from '@angular/common';
import {
	afterNextRender,
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	DoCheck,
	effect,
	forwardRef,
	inject,
	Injector,
	input,
	model,
	OnDestroy,
	Renderer2,
	signal,
	TemplateRef,
	ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, NgControl, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { FormField } from '@angular/forms/signals';
import { SafeHtml } from '@angular/platform-browser';
import {
	intlInputOptions,
	isNotNil,
	luBooleanAttribute,
	LuClass,
	luNullableBooleanAttribute,
	luNullableNumberAttribute,
	luNumberAttribute,
	PortalContent,
	PortalDirective,
	ɵeffectWithDeps,
} from '@lucca-front/ng/core';
import { LU_FORM_INSTANCE } from '@lucca-front/ng/form';
import { FormLabelComponent } from '@lucca-front/ng/form-label';
import { IconComponent } from '@lucca-front/ng/icon';
import { InlineMessageComponent, InlineMessageState } from '@lucca-front/ng/inline-message';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { BehaviorSubject } from 'rxjs';
import { FormFieldSize } from './form-field-size';
import { FORM_FIELD_INSTANCE } from './form-field.token';
import { LU_FORM_FIELD_TRANSLATIONS } from './form-field.translate';
import { FormFieldLayout, FormFieldWidth } from './form-field.type';
import { InputDirective } from './input.directive';
import { INPUT_FRAMED_INSTANCE } from './public-api';

let nextId = 0;

@Component({
	selector: 'lu-form-field',
	imports: [NgTemplateOutlet, InlineMessageComponent, LuTooltipModule, ReactiveFormsModule, IconComponent, PortalDirective, FormLabelComponent],
	templateUrl: './form-field.component.html',
	styleUrl: './form-field.component.scss',
	providers: [
		LuClass,
		{
			provide: FORM_FIELD_INSTANCE,
			useExisting: forwardRef(() => FormFieldComponent),
		},
	],
	host: {
		'[class.inputFramed-header-field]': 'framed',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements OnDestroy, DoCheck {
	readonly intl = input(...intlInputOptions(LU_FORM_FIELD_TRANSLATIONS));

	#luClass = inject(LuClass);
	#injector = inject(Injector);
	#renderer = inject(Renderer2);
	protected parentForm = inject(LU_FORM_INSTANCE, { optional: true });

	readonly framed = inject(INPUT_FRAMED_INSTANCE, { optional: true }) !== null;

	readonly formFieldChildren = contentChildren(FormFieldComponent, { descendants: true });

	readonly requiredValidators = contentChildren(RequiredValidator, { descendants: true });
	readonly ngControls = contentChildren(NgControl, { descendants: true });
	readonly ngFormFields = contentChildren(FormField, { descendants: true });

	readonly ignoredRequiredValidators = computed(() => new Set(this.formFieldChildren().flatMap((f) => f.requiredValidators())));
	readonly ignoredControls = computed(() => new Set(this.formFieldChildren().flatMap((f) => f.ngControls())));
	readonly ignoredFormFields = computed(() => new Set(this.formFieldChildren().flatMap((f) => f.ngFormFields())));

	readonly ownRequiredValidators = computed(() => this.requiredValidators().filter((c) => !this.ignoredRequiredValidators().has(c)));
	readonly ownControls = computed(() => this.ngControls().filter((c) => !this.ignoredControls().has(c)));
	readonly ownFormFields = computed(() => this.ngFormFields().filter((c) => !this.ignoredFormFields().has(c)));

	readonly #hasInputRequired = signal(false);
	readonly forceInputRequired = signal(false);
	readonly isInputRequired = computed(() => this.forceInputRequired() || this.#hasInputRequired());

	/**
	 * Label of the field
	 */
	readonly label = input.required<PortalContent>();

	/**
	 * Hide field label, while keeping it in DOM for screen readers
	 */
	readonly hiddenLabel = input(false, { transform: luBooleanAttribute });

	/**
	 * Sets `role="presentation"` on the label (two-way bindable)
	 */
	readonly rolePresentationLabel = model(false);

	readonly labelIsPresentation = computed(() => this.rolePresentationLabel() || this.presentation());

	/**
	 * Displays the options of a fieldset layout inline
	 */
	readonly inline = input(false, { transform: luBooleanAttribute });

	/**
	 * Control used to compute the invalid status instead of the projected controls
	 */
	readonly statusControl = input<AbstractControl | null>(null);

	/**
	 * Displays an info icon with a tooltip next to the label
	 */
	readonly tooltip = input<string | SafeHtml | null>(null);

	/**
	 * Displays a tag next to the label
	 */
	readonly tag = input<string | null>(null);

	/**
	 * Displays an AI icon next to the field
	 */
	readonly AI = input(false, { transform: luBooleanAttribute });
	/**
	 * Tooltip of the AI icon
	 */
	readonly iconAItooltip = input<string | null>(null);
	/**
	 * Alternative text of the AI icon
	 */
	readonly iconAIalt = input<string | null>(null);

	/**
	 * Sets the width of the field
	 */
	readonly width = input(null, { transform: luNullableNumberAttribute<FormFieldWidth> });

	readonly #invalidStatus = signal(false);
	invalidStatus = this.#invalidStatus.asReadonly();

	/**
	 * Forces the invalid status of the field, overriding the status of its controls
	 */
	readonly invalid = input(null, { transform: luNullableBooleanAttribute });

	/**
	 * Inline message displayed below the field
	 */
	readonly inlineMessage = input<PortalContent | null>(null);

	/**
	 * Inline message for when the control is in error state
	 */
	readonly errorInlineMessage = input<PortalContent | null>(null);

	/**
	 * State of the inline message, will be ignored if form state is invalid
	 */
	readonly inlineMessageState = input<InlineMessageState | null>(null);

	/**
	 * Changes the size of the field
	 */
	readonly size = input<FormFieldSize | null>(null);

	/**
	 * Extra aria-describedby attribute
	 */
	readonly extraDescribedBy = input<string>('');

	/**
	 * Layout of the field (two-way bindable)
	 */
	readonly layout = model<FormFieldLayout>('default');

	#inputs: InputDirective[] = [];

	/**
	 * Max amount of characters allowed, defaults to 0, which means hidden, no maximum
	 */
	readonly counter = input(0, { transform: luNumberAttribute });

	readonly contentLength = signal<number>(0);

	/**
	 * Displays the field in presentation mode (read-only value instead of the input)
	 */
	readonly presentation = input(false, { transform: luBooleanAttribute });

	readonly presentationMode = computed(() => this.parentForm?.presentation() || this.presentation());

	readonly presentationDisplayTpl = signal<TemplateRef<unknown> | null>(null);

	readonly hasInlineMessage = computed(() => !this.presentationMode() && !!(this.inlineMessage() || (this.invalidStatus() ? this.errorInlineMessage() : false)));

	public addInput(input: InputDirective) {
		this.#inputs.push(input);
		afterNextRender(
			() => {
				this.prepareInput();
			},
			{ injector: this.#injector },
		);
	}

	public get inputs(): InputDirective[] {
		return this.#inputs;
	}

	readonly id = signal<string>('');

	readonly ready$ = new BehaviorSubject<boolean>(false);

	public get ready(): boolean {
		return this.ready$.value;
	}

	readonly #ariaLabelledBy = signal<string[]>([]);

	/**
	 * Ids labelling the inputs of this field, applied by each non-standalone `luInput`
	 */
	readonly ariaLabelledBy = this.#ariaLabelledBy.asReadonly();

	/**
	 * Ids describing the inputs of this field, applied by each non-standalone `luInput`
	 */
	readonly ariaDescribedBy = computed(() => {
		if (!this.id()) {
			return [];
		}
		const message = this.hasInlineMessage() ? [`${this.id()}-message`] : [];
		return [...message, ...this.extraDescribedBy().split(/\s+/).filter(Boolean)];
	});

	constructor() {
		ɵeffectWithDeps([this.isInputRequired, this.invalidStatus], () => {
			this.updateAria();
		});

		effect(() => {
			this.#luClass.setState({
				[`mod-${this.size()}`]: !!this.size(),
				'form-field': this.layout() !== 'fieldset' && !this.presentationMode(),
				[`mod-width${this.width()}`]: !!this.width(),
			});
		});
	}

	addLabelledBy(id: string, prepend = false): void {
		this.#ariaLabelledBy.update((ids) => (prepend ? [id, ...ids] : [...ids, id]));
	}

	removeLabelledBy(id: string): void {
		this.#ariaLabelledBy.update((ids) => ids.filter((labelledBy) => labelledBy !== id));
	}

	prepareInput(): void {
		if (this.#inputs.length === 0) {
			throw new Error('Missing input for form field, make sure to set `luInput` to your input inside lu-form-field');
		}
		this.inputs
			.filter((input) => !input.standalone())
			.forEach((input) => {
				const inputId = `${input.host.nativeElement.tagName.toLowerCase()}-${++nextId}`;
				this.#renderer.setAttribute(input.host.nativeElement, 'id', inputId);
			});
		// We're using the id from the first input available
		this.id.set(this.#inputs[0].host.nativeElement.id);
		this.updateAria();
		this.ready$.next(true);
	}

	private updateAria(): void {
		this.#inputs.forEach((input) => {
			this.#renderer.setAttribute(input.host.nativeElement, 'aria-invalid', this.invalidStatus()?.toString());
			this.#renderer.setAttribute(input.host.nativeElement, 'aria-required', this.isInputRequired()?.toString());
		});
		if (this.id() && !this.#ariaLabelledBy().includes(`${this.id()}-label`)) {
			this.addLabelledBy(`${this.id()}-label`);
		}
	}

	ngOnDestroy(): void {
		this.ready$.complete();
	}

	ngDoCheck(): void {
		afterNextRender(
			() => {
				this.#hasInputRequired.set(this.#isInputRequired());
				this.#invalidStatus.set(this.#hasInvalidStatus());
				this.contentLength.set((this.#inputs[0]?.host?.nativeElement as HTMLInputElement)?.value?.length ?? 0);
			},
			{
				injector: this.#injector,
			},
		);
	}

	#isInputRequired(): boolean {
		const hasRequiredFormControl = this.ownControls().some((c) => c.control?.hasValidator(Validators.required));
		const hasRequiredNgModel = this.ownRequiredValidators().some((c) => booleanAttribute(c.required));
		const hasRequiredFormField = this.ownFormFields().some((c) => c.state().required());
		return hasRequiredFormField || hasRequiredNgModel || hasRequiredFormControl;
	}

	#hasInvalidStatus(): boolean {
		const isInvalidOverride = isNotNil(this.invalid());
		if (isInvalidOverride) {
			return this.invalid() ?? false;
		}
		const statusControlOverride = this.statusControl();
		if (statusControlOverride) {
			return statusControlOverride.invalid && this.ownControls().some((c) => c?.touched);
		}
		return this.ownControls().some((c) => c.invalid && c.touched);
	}
}
