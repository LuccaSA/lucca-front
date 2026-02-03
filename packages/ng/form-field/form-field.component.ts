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
	numberAttribute,
	OnDestroy,
	Renderer2,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, NgControl, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { intlInputOptions, LuClass, PortalContent, PortalDirective, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { FormLabelComponent } from '@lucca-front/ng/form-label';
import { IconComponent } from '@lucca-front/ng/icon';
import { InlineMessageComponent, InlineMessageState } from '@lucca-front/ng/inline-message';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { BehaviorSubject } from 'rxjs';
import { FormFieldSize } from './form-field-size';
import { FORM_FIELD_INSTANCE } from './form-field.token';
import { LU_FORM_FIELD_TRANSLATIONS } from './form-field.translate';
import { InputDirective } from './input.directive';
import { INPUT_FRAMED_INSTANCE } from './public-api';

let nextId = 0;

type FormFieldWidth = 20 | 30 | 40 | 50 | 60;

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

	framed = inject(INPUT_FRAMED_INSTANCE, { optional: true }) !== null;

	readonly formFieldChildren = contentChildren(FormFieldComponent, { descendants: true });

	readonly requiredValidators = contentChildren(RequiredValidator, { descendants: true });
	readonly ngControls = contentChildren(NgControl, { descendants: true });

	readonly ignoredRequiredValidators = computed(() => new Set(this.formFieldChildren().flatMap((f) => f.requiredValidators())));
	readonly ignoredControls = computed(() => new Set(this.formFieldChildren().flatMap((f) => f.ngControls())));

	readonly ownRequiredValidators = computed(() => this.requiredValidators().filter((c) => !this.ignoredRequiredValidators().has(c)));
	readonly ownControls = computed(() => this.ngControls().filter((c) => !this.ignoredControls().has(c)));

	#hasInputRequired = signal(false);
	forceInputRequired = signal(false);
	readonly isInputRequired = computed(() => this.forceInputRequired() || this.#hasInputRequired());

	readonly label = input.required<PortalContent>();

	/**
	 * Hide field label, while keeping it in DOM for screen readers
	 */
	readonly hiddenLabel = input(false, { transform: booleanAttribute });

	rolePresentationLabel = model(false);

	readonly inline = input(false, { transform: booleanAttribute });

	readonly statusControl = input<AbstractControl | null>(null);

	readonly tooltip = input<string | SafeHtml | null>(null);

	readonly tag = input<string | null>(null);

	readonly AI = input(false, { transform: booleanAttribute });
	readonly iconAItooltip = input<string | null>(null);
	readonly iconAIalt = input<string | null>(null);

	readonly width = input<FormFieldWidth, FormFieldWidth | `${FormFieldWidth}`>(null, {
		transform: numberAttribute as (value: FormFieldWidth | `${FormFieldWidth}`) => FormFieldWidth,
	});

	#invalidStatus = signal(false);
	invalidStatus = this.#invalidStatus.asReadonly();

	invalid = input<boolean | null, boolean>(null, { transform: booleanAttribute });

	readonly inlineMessage = input<PortalContent | null>(null);

	/**
	 * Inline message for when the control is in error state
	 */
	readonly errorInlineMessage = input<PortalContent | null>(null);

	/**
	 * State of the inline message, will be ignored if form state is invalid
	 */
	readonly inlineMessageState = input<InlineMessageState | null>(null);

	readonly size = input<FormFieldSize | null>(null);

	/**
	 * Extra aria-describedby attribute
	 */
	readonly extraDescribedBy = input<string>('');

	layout = model<'default' | 'checkable' | 'fieldset'>('default');

	#inputs: InputDirective[] = [];

	/**
	 * Max amount of characters allowed, defaults to 0, which means hidden, no maximum
	 */
	readonly counter = input<number>(0);

	readonly contentLength = signal<number>(0);

	readonly counterVisibleOnlyJustBeforeError = input(false, { transform: booleanAttribute });

	public addInput(input: InputDirective) {
		this.#inputs.push(input);
		/* We have to put this in the next cycle to make sure it'll be applied properly
		 * and that it won't trigger a change detection error
		 */
		setTimeout(() => {
			this.prepareInput();
		});
	}

	public get inputs(): InputDirective[] {
		return this.#inputs;
	}

	id = signal<string>('');

	ready$ = new BehaviorSubject<boolean>(false);

	public get ready(): boolean {
		return this.ready$.value;
	}

	#ariaLabelledBy: string[] = [];

	constructor() {
		ɵeffectWithDeps([this.isInputRequired, this.invalidStatus, this.extraDescribedBy], () => {
			this.updateAria();
		});

		effect(() => {
			this.#luClass.setState({
				[`mod-${this.size()}`]: !!this.size(),
				'mod-checkable': this.layout() === 'checkable',
				'form-field': this.layout() !== 'fieldset',
				[`mod-width${this.width()}`]: !!this.width(),
			});
		});
	}

	addLabelledBy(id: string, prepend = false): void {
		if (prepend) {
			this.#ariaLabelledBy = [id, ...this.#ariaLabelledBy];
		} else {
			this.#ariaLabelledBy = [...this.#ariaLabelledBy, id];
		}
		this.#inputs.forEach((input) => {
			if (!input.standalone) {
				this.#renderer.setAttribute(input.host.nativeElement, 'aria-labelledby', this.#ariaLabelledBy.join(' '));
			}
		});
	}

	removeLabelledBy(id: string): void {
		this.#ariaLabelledBy = this.#ariaLabelledBy.filter((labelledBy) => labelledBy === id);
	}

	prepareInput(): void {
		if (this.#inputs.length === 0) {
			throw new Error('Missing input for form field, make sure to set `luInput` to your input inside lu-form-field');
		}
		this.inputs
			.filter((input) => !input.standalone)
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
			if (!input.standalone) {
				let ariaDescribedBy = `${input.host.nativeElement.id}-message`;
				if (this.extraDescribedBy()) {
					ariaDescribedBy += ` ${this.extraDescribedBy()}`;
				}
				this.#renderer.setAttribute(input.host.nativeElement, 'aria-describedby', ariaDescribedBy);
			}
		});
		if (this.id() && !this.#ariaLabelledBy.includes(`${this.id()}-label`)) {
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
		return hasRequiredNgModel || hasRequiredFormControl;
	}

	#hasInvalidStatus(): boolean {
		const isInvalidOverride = this.invalid() !== undefined && this.invalid() !== null;
		if (isInvalidOverride) {
			return this.invalid();
		}
		const statusControlOverride = this.statusControl();
		if (statusControlOverride) {
			return statusControlOverride.invalid && this.ownControls().some((c) => c?.touched);
		}
		return this.ownControls().some((c) => c.invalid && c.touched);
	}
}
