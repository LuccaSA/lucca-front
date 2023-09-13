import {
	AfterViewInit,
	booleanAttribute,
	Component,
	ContentChild,
	HostBinding,
	inject,
	Input,
	OnChanges,
} from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { InputDirective } from './input.directive';

/**
 * I know, it's a var, and vars are ugly.
 * But aside from this, generating a random unique id for inputs quickly becomes a headache
 */
// eslint-disable-next-line
var nextId = 0;

@Component({
	selector: 'lu-form-field',
	standalone: true,
	imports: [NgIf],
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	hostDirectives: [NgClass],
})
export class FormFieldComponent implements OnChanges, AfterViewInit {
	#ngClass = inject(NgClass);

	@HostBinding('class')
	clazz = 'form-field u-marginBottomM';

	@Input({
		required: true,
	})
	label: string;

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

	@ContentChild(InputDirective)
	input: InputDirective;

	id: string;

	#nativeInputRef: HTMLElement;

	ngOnChanges(): void {
		this.#ngClass.ngClass = {
			[`mod-${this.size}`]: true,
		};
		if (this.#nativeInputRef) {
			this.#nativeInputRef.ariaInvalid = this.invalid.toString();
			this.#nativeInputRef.ariaRequired = this.required.toString();
		}
	}

	ngAfterViewInit(): void {
		if (!this.input) {
			throw new Error('Missing input for form field, make sure to set `luInput` to your input inside lu-form-field');
		}
		this.#nativeInputRef = this.input.host.nativeElement as HTMLElement;
		this.id = `${this.#nativeInputRef.tagName.toLowerCase()}-${++nextId}`;
		this.#nativeInputRef.id = this.id;
	}
}
