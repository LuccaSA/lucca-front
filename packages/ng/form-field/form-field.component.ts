import { AfterViewInit, booleanAttribute, Component, ContentChild, HostBinding, inject, Input, OnChanges } from '@angular/core';
import { NgClass, NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { InputDirective } from './input.directive';

let nextId = 0;

@Component({
	selector: 'lu-form-field',
	standalone: true,
	imports: [NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet],
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	hostDirectives: [NgClass],
})
export class FormFieldComponent implements OnChanges, AfterViewInit {
	#ngClass = inject(NgClass);

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

	@Input()
	size: 'XS' | 'S' | 'M' = 'M';

	@Input()
	mode: 'default' | 'checkbox' = 'default';

	@ContentChild(InputDirective)
	input: InputDirective;

	id: string;

	#nativeInputRef: HTMLElement;

	ngOnChanges(): void {
		this.#ngClass.ngClass = {
			[`mod-${this.size}`]: true,
		};
		if (this.#nativeInputRef) {
			this.updateAria();
		}
	}

	ngAfterViewInit(): void {
		if (!this.input) {
			throw new Error('Missing input for form field, make sure to set `luInput` to your input inside lu-form-field');
		}
		this.#nativeInputRef = this.input.host.nativeElement as HTMLElement;
		this.id = `${this.#nativeInputRef.tagName.toLowerCase()}-${++nextId}`;
		this.#nativeInputRef.id = this.id;
		this.updateAria();
	}

	private updateAria(): void {
		this.#nativeInputRef.ariaInvalid = this.invalid.toString();
		this.#nativeInputRef.ariaRequired = this.required.toString();
		this.#nativeInputRef.setAttribute('aria-describedby', `${this.id}-message`);
		this.#nativeInputRef.setAttribute('aria-labelledby', `${this.id}-prefix ${this.id}-label ${this.id}-suffix`);
	}
}
