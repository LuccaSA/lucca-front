import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
	afterNextRender,
	booleanAttribute,
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
import { getIntl, IntlParamsPipe, LuClass, PortalContent, PortalDirective, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { InlineMessageComponent, InlineMessageState } from '@lucca-front/ng/inline-message';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { BehaviorSubject } from 'rxjs';
import { FormFieldSize } from './form-field-size';
import { FORM_FIELD_INSTANCE } from './form-field.token';
import { LU_FORM_FIELD_TRANSLATIONS } from './form-field.translate';
import { InputDirective } from './input.directive';

let nextId = 0;

type FormFieldWidth = 20 | 30 | 40 | 50 | 60;

@Component({
	selector: 'lu-form-field',
	standalone: true,
	imports: [NgIf, NgTemplateOutlet, InlineMessageComponent, LuTooltipModule, ReactiveFormsModule, IconComponent, IntlParamsPipe, PortalDirective],
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	providers: [
		LuClass,
		{
			provide: FORM_FIELD_INSTANCE,
			useExisting: forwardRef(() => FormFieldComponent),
		},
	],
	encapsulation: ViewEncapsulation.None,
})
export class FormFieldComponent implements OnDestroy, DoCheck {
	intl = getIntl(LU_FORM_FIELD_TRANSLATIONS);

	#luClass = inject(LuClass);
	#injector = inject(Injector);
	#renderer = inject(Renderer2);

	formFieldChildren = contentChildren(FormFieldComponent, { descendants: true });

	requiredValidators = contentChildren(RequiredValidator, { descendants: true });
	ngControls = contentChildren(NgControl, { descendants: true });

	ignoredRequiredValidators = computed(() => new Set(this.formFieldChildren().flatMap((f) => f.requiredValidators())));
	ignoredControls = computed(() => new Set(this.formFieldChildren().flatMap((f) => f.ngControls())));

	ownRequiredValidators = computed(() => this.requiredValidators().filter((c) => !this.ignoredRequiredValidators().has(c)));
	ownControls = computed(() => this.ngControls().filter((c) => !this.ignoredControls().has(c)));

	#hasInputRequired = signal(false);
	isInputRequired = this.#hasInputRequired.asReadonly();

	label = input.required<PortalContent>();

	/**
	 * Hide field label, while keeping it in DOM for screen readers
	 */
	hiddenLabel = input(false, { transform: booleanAttribute });

	rolePresentationLabel = model(false);

	inline = input(false, { transform: booleanAttribute });

	statusControl = input<AbstractControl | null>(null);

	tooltip = input<string | SafeHtml | null>(null);

	width = input<FormFieldWidth, FormFieldWidth | `${FormFieldWidth}`>(null, {
		transform: numberAttribute as (value: FormFieldWidth | `${FormFieldWidth}`) => FormFieldWidth,
	});

	#invalidStatus = signal(false);
	invalidStatus = this.#invalidStatus.asReadonly();

	invalid = input<boolean | null, boolean>(null, { transform: booleanAttribute });

	inlineMessage = input<PortalContent | null>(null);

	/**
	 * Inline message for when the control is in error state
	 */
	errorInlineMessage = input<PortalContent | null>(null);

	/**
	 * State of the inline message, will be ignored if form state is invalid
	 */
	inlineMessageState = input<InlineMessageState | null>(null);

	size = input<FormFieldSize | null>(null);

	layout = model<'default' | 'checkable' | 'fieldset'>('default');

	hasArrow = false;

	#inputs: InputDirective[] = [];

	/**
	 * Max amount of characters allowed, defaults to 0, which means hidden, no maximum
	 */
	counter = input<number>(0);

	get contentLength(): number {
		return (this.#inputs[0]?.host?.nativeElement as HTMLInputElement)?.value.length || 0;
	}

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
		ɵeffectWithDeps([this.isInputRequired, this.invalidStatus], () => {
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
				this.#renderer.setAttribute(input.host.nativeElement, 'aria-describedby', `${input.host.nativeElement.id}-message`);
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
