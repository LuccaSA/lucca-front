import { booleanAttribute, Component, forwardRef, HostBinding, inject, Input, OnChanges, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { InputDirective } from './input.directive';
import { FormFieldSize } from './form-field-size';
import { BehaviorSubject } from 'rxjs';
import { InlineMessageComponent, InlineMessageState } from '@lucca-front/ng/inline-message';
import { SafeHtml } from '@angular/platform-browser';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { NgClazz } from '@lucca-front/ng/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { FORM_FIELD_INSTANCE } from './form-field.token';

let nextId = 0;

@Component({
	selector: 'lu-form-field',
	standalone: true,
	imports: [NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet, InlineMessageComponent, LuTooltipModule, ReactiveFormsModule, IconComponent],
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	hostDirectives: [NgClazz],
	providers: [
		{
			provide: FORM_FIELD_INSTANCE,
			useExisting: forwardRef(() => FormFieldComponent),
		},
	],
	encapsulation: ViewEncapsulation.None,
})
export class FormFieldComponent implements OnChanges, OnDestroy {
	#ngClass = inject(NgClazz);

	@HostBinding('class')
	clazz = 'form-field';

	@Input({
		required: true,
	})
	label: string;

	@Input({
		transform: booleanAttribute,
	})
	hiddenLabel = false;

	@Input()
	tooltip: string | SafeHtml;

	@Input({
		transform: booleanAttribute,
	})
	required = false;

	@Input({
		transform: booleanAttribute,
	})
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
	layout: 'default' | 'checkable' = 'default';

	private _input: InputDirective;

	public set input(input: InputDirective) {
		this._input = input;
		this.prepareInput();
	}

	public get input(): InputDirective {
		return this._input;
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
		if (this.#nativeInputRef) {
			this.#nativeInputRef.setAttribute('aria-labelledby', this.#ariaLabelledBy.join(' '));
		}
	}

	removeLabelledBy(id: string): void {
		this.#ariaLabelledBy = this.#ariaLabelledBy.filter((labelledBy) => labelledBy === id);
	}

	#nativeInputRef: HTMLElement;

	ngOnChanges(): void {
		this.#ngClass.ngClass = {
			[`mod-${this.size}`]: true,
			[`mod-checkable`]: this.layout === 'checkable',
		};
		if (this.#nativeInputRef) {
			this.updateAria();
		}
	}

	prepareInput(): void {
		if (!this.input) {
			throw new Error('Missing input for form field, make sure to set `luInput` to your input inside lu-form-field');
		}
		this.#nativeInputRef = this.input.host.nativeElement;
		this.id = `${this.#nativeInputRef.tagName.toLowerCase()}-${++nextId}`;
		this.#nativeInputRef.id = this.id;
		this.updateAria();
		this.ready$.next(true);
	}

	private updateAria(): void {
		this.#nativeInputRef.ariaInvalid = this.invalid.toString();
		this.#nativeInputRef.ariaRequired = this.required.toString();
		this.#nativeInputRef.setAttribute('aria-describedby', `${this.id}-message`);
		this.addLabelledBy(`${this.id}-label`);
	}

	ngOnDestroy(): void {
		this.ready$.complete();
	}
}
