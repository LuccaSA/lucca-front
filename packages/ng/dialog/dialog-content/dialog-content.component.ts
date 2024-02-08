import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';

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
