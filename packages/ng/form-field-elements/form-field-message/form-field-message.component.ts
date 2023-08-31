import { Component, inject, Input, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[lu-form-field-message]',
	standalone: true,
	imports: [NgIf],
	hostDirectives: [NgClass],
	templateUrl: './form-field-message.component.html',
	styleUrls: ['./form-field-message.component.scss'],
})
export class FormFieldMessageComponent implements OnInit {
	/**
	 * TODO handle id input to apply it to the host element
	 */

	private ngClass = inject(NgClass);

	@Input()
	message: string;

	@Input()
	set state(state: 'default' | 'success' | 'warning' | 'error') {
		this.ngClass.ngClass = [`is-${state}`];
	}

	ngOnInit(): void {
		this.ngClass.klass = 'inlineMessage';
	}
}
