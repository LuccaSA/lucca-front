import { booleanAttribute, Component, ContentChildren, DestroyRef, DoCheck, forwardRef, inject, Input, OnChanges, OnDestroy, QueryList, Renderer2, ViewEncapsulation } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { InputDirective } from './input.directive';
import { FormFieldSize } from './form-field-size';
import { BehaviorSubject, map, merge, startWith, Subject, switchMap } from 'rxjs';
import { InlineMessageComponent, InlineMessageState } from '@lucca-front/ng/inline-message';
import { AbstractControl, NG_VALIDATORS, NgControl, ReactiveFormsModule, RequiredValidator, Validator, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { getIntl, IntlParamsPipe, LuClass, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { FORM_FIELD_INSTANCE } from './form-field.token';
import { LU_FORM_FIELD_TRANSLATIONS } from './form-field.translate';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

let nextId = 0;

@Component({
	selector: 'lu-form-field',
	standalone: true,
	imports: [NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet, InlineMessageComponent, LuTooltipModule, ReactiveFormsModule, IconComponent, IntlParamsPipe, PortalDirective],
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
	intl = getIntl(LU_FORM_FIELD_TRANSLATIONS);

	#luClass = inject(LuClass);

	#renderer = inject(Renderer2);

	#requiredValidator: RequiredValidator | undefined;

	#destroyRef = inject(DestroyRef);

	#doCheck$ = new Subject<void>();

	@ContentChildren(NG_VALIDATORS, { descendants: true })
	public set validators(validators: QueryList<Validator | undefined>) {
		this.#requiredValidator = validators.toArray()?.find((v): v is RequiredValidator => v instanceof RequiredValidator);
	}

	@ContentChildren(NgControl, { descendants: true })
	set controls(controls: QueryList<NgControl>) {
		const controls$ = controls.changes.pipe(
			takeUntilDestroyed(this.#destroyRef),
			startWith(controls),
			map(() => controls.toArray()),
		);
		// If a control is added or removed, we want to update status based on the new ones
		controls$.subscribe((controls) => {
			this.updateRequiredStatus(controls);
		});
		// Upon status change or NgDoCheck trigger, we want to update validity and display
		controls$
			.pipe(
				switchMap((controls) => {
					// We have to trigger status check on DoCheck too to properly update display when control.touched changes
					// Because we can't listen to `control.touched` changes, we need to hook on this.
					// TODO use unified control state change events once we have Angular 18
					return merge(this.#doCheck$, ...controls.map((control) => control.statusChanges)).pipe(map(() => controls));
				}),
			)
			.subscribe((controls) => {
				this.updateRequiredStatus(controls);
			});
	}

	@Input({
		required: true,
	})
	label: PortalContent;

	@Input({
		transform: booleanAttribute,
	})
	hiddenLabel = false;

	@Input({
		transform: booleanAttribute,
	})
	rolePresentationLabel = false;

	@Input()
	statusControl: AbstractControl;

	@Input()
	tooltip: string | SafeHtml;

	@Input()
	invalid = false;

	@Input()
	inlineMessage: string;

	/**
	 * Inline message for when the control is in error state
	 */
	@Input()
	errorInlineMessage: string;

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
	/**
	 * Max amount of characters allowed, defaults to 0, which means hidden, no maximum
	 */
	@Input()
	counter = 0;

	required = false;

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
			this.#renderer.setAttribute(input.host.nativeElement, 'aria-invalid', this.invalid?.toString());
			this.#renderer.setAttribute(input.host.nativeElement, 'aria-required', this.required?.toString());
			if (!input.standalone) {
				this.#renderer.setAttribute(input.host.nativeElement, 'aria-describedby', `${input.host.nativeElement.id}-message`);
			}
		});
		if (this.id) {
			this.addLabelledBy(`${this.id}-label`);
		}
	}

	private updateRequiredStatus(controls: NgControl[]): void {
		controls.forEach((control) => {
			// invalid management
			const previousInvalid = this.invalid;
			this.invalid = (control.invalid || this.statusControl?.invalid) && control.touched;

			// required management
			const previousRequired = this.required;
			this.required = this.#requiredValidator
				? booleanAttribute(this.#requiredValidator.required)
				: control.control.hasValidator(Validators.required) || control.control.hasValidator(Validators.requiredTrue);

			// If stuff changed, update aria attributes
			if (this.invalid !== previousInvalid || this.required !== previousRequired) {
				this.updateAria();
			}
		});
	}

	ngOnDestroy(): void {
		this.ready$.complete();
	}

	ngDoCheck(): void {
		this.#doCheck$.next();
	}
}
