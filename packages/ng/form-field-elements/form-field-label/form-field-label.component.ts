import { booleanAttribute, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'label[lu-form-field-label]',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './form-field-label.component.html',
	styleUrls: ['./form-field-label.component.scss'],
})
export class FormFieldLabelComponent {
	// TODO use a better class than textField-label to make things more generic?
	@HostBinding('class')
	klass = 'textField-label';

	@Input({ transform: booleanAttribute })
	required: boolean;

	@Input({ transform: booleanAttribute })
	help: boolean;
}
