import { booleanAttribute, Component, ContentChildren, DoCheck, forwardRef, inject, Input, OnChanges, OnDestroy, QueryList, Renderer2, ViewEncapsulation } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { InputDirective } from './input.directive';
import { FormFieldSize } from './form-field-size';
import { BehaviorSubject } from 'rxjs';
import { InlineMessageComponent, InlineMessageState } from '@lucca-front/ng/inline-message';
import { SafeHtml } from '@angular/platform-browser';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuClass, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { NG_VALIDATORS, NgControl, ReactiveFormsModule, RequiredValidator, Validator, Validators } from '@angular/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { FORM_FIELD_INSTANCE } from './form-field.token';

let nextId = 0;

@Component({
	selector: 'lu-form-field',
	standalone: true,
	imports: [NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet, InlineMessageComponent, LuTooltipModule, ReactiveFormsModule, IconComponent, PortalDirective],
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
export class FormFieldComponent implements OnChanges, OnDestroy, DoCheck {
	#luClass = inject(LuClass);

	#renderer = inject(Renderer2);

	#requiredValidator: RequiredValidator | undefined;

	@ContentChildren(NG_VALIDATORS)
	public set validators(validators: QueryList<Validator | undefined>) {
		this.#requiredValidator = validators.toArray()?.find((v): v is RequiredValidator => v instanceof RequiredValidator);
	}

	@ContentChildren(NgControl)
	controls: NgControl[] = [];

	@Input({
		required: true,
	})
	label: PortalContent;

	@Input({
		transform: booleanAttribute,
	})
	hiddenLabel = false;

	@Input()
	tooltip: string | SafeHtml;

	required = false;

	@Input()
	invalid = false;

	@Input()
	inlineMessage: string;

	/**
	 * State of the inline message, will be ignored if form state is invalid
	 */
	@Input()
	inlineMessageState: InlineMessageState;

	@Input()
	size: FormFieldSize;

	@Input()
	layout: 'default' | 'checkable' | 'fieldset' = 'default';

	#inputs: InputDirective[] = [];

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

	id: string;

	ready$ = new BehaviorSubject<boolean>(false);

	public get ready(): boolean {
		return this.ready$.value;
	}

	#ariaLabelledBy: string[] = [];

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

	ngOnChanges(): void {
		this.#luClass.setState({
			[`mod-${this.size}`]: true,
			'mod-checkable': this.layout === 'checkable',
			'form-field': this.layout !== 'fieldset',
		});
		this.updateAria();
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
		this.id = this.#inputs[0].host.nativeElement.id;
		this.updateAria();
		this.ready$.next(true);
	}

	private updateAria(): void {
		this.#inputs.forEach((input) => {
			this.#renderer.setAttribute(input.host.nativeElement, 'aria-invalid', this.invalid.toString());
			this.#renderer.setAttribute(input.host.nativeElement, 'aria-required', this.required.toString());
			if (!input.standalone) {
				this.#renderer.setAttribute(input.host.nativeElement, 'aria-describedby', `${input.host.nativeElement.id}-message`);
			}
		});
		if (this.id) {
			this.addLabelledBy(`${this.id}-label`);
		}
	}

	ngOnDestroy(): void {
		this.ready$.complete();
	}

	ngDoCheck(): void {
		this.controls.forEach((control) => {
			// invalid management
			const previousInvalid = this.invalid;
			this.invalid = control.invalid && control.touched;

			// required management
			const previousRequired = this.required;
			this.required = this.#requiredValidator
				? booleanAttribute(this.#requiredValidator.required)
				: control.control.hasValidator(Validators.required) || control.control.hasValidator(Validators.requiredTrue);

			// If stuff changed, update aria attributes
			if (this.#nativeInputRef && (this.invalid !== previousInvalid || this.required !== previousRequired)) {
				this.updateAria();
			}
		});
	}
}
