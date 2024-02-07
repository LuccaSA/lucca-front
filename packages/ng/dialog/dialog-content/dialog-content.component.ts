import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CheckboxInputComponent } from '../../forms/checkbox-input/checkbox-input.component';
import { FormFieldComponent } from '../../form-field/form-field.component';

@Component({
	selector: 'lu-dialog-content',
	standalone: true,
	imports: [CheckboxInputComponent, FormFieldComponent],
	templateUrl: './dialog-content.component.html',
	styleUrl: './dialog-content.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dialog-inside-content',
	},
})
export class DialogContentComponent {}
