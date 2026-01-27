import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { DialogCloseDirective, DialogComponent, DialogContentComponent, DialogDismissDirective, DialogFooterComponent, DialogHeaderComponent, injectDialogRef } from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { Task } from '../models';

@Component({
	selector: 'app-task-form-dialog',
	imports: [
		ButtonComponent,
		DialogComponent,
		DialogHeaderComponent,
		DialogContentComponent,
		DialogFooterComponent,
		DialogCloseDirective,
		DialogDismissDirective,
		FormFieldComponent,
		TextInputComponent,
		FormsModule,
		DateInputComponent,
		GridComponent,
		GridColumnComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './task-form-dialog.component.html',
	// styleUrl: './task-form-dialog.scss',
})
export class TaskFormDialog {
	ref = injectDialogRef<Task>();

	name = signal('');
	dueDate = signal(new Date());

	formValue = computed<Task>(() => ({
		id: 12,
		name: this.name(),
		status: 'InProgress',
		user: { firstName: 'John', lastName: 'Doe' },
		dueDate: this.dueDate(),
	}));

	submitForm(ngForm: NgForm): void {
		if (ngForm.invalid) {
			ngForm.form.markAllAsTouched();
			return;
		}

		this.ref.close(this.formValue());
	}
}
