import { allLegumes } from '@/stories/forms/select/select.utils';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	DialogComponent,
	DialogContentComponent,
	DialogDismissDirective,
	DialogFooterComponent,
	DialogHeaderComponent,
	LuDialogRef,
	LuDialogService,
	configureLuDialog,
	injectDialogData,
	injectDialogRef,
	provideLuDialog,
} from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, StoryObj, applicationConfig } from '@storybook/angular';

@Component({
	selector: 'sb-dialog-content',
	template: `
		<lu-dialog>
			<lu-dialog-header>Header</lu-dialog-header>

			<lu-dialog-content>
				<lu-form-field label="Test">
					<lu-simple-select ngModel [options]="legumes"></lu-simple-select>
				</lu-form-field>
				<lu-form-field label="Test">
					<lu-simple-select ngModel [options]="legumes"></lu-simple-select>
				</lu-form-field>
				<lu-form-field label="Test">
					<lu-simple-select ngModel [options]="legumes"></lu-simple-select>
				</lu-form-field>
				<lu-form-field label="Test">
					<lu-simple-select ngModel [options]="legumes"></lu-simple-select>
				</lu-form-field>
			</lu-dialog-content>

			<lu-dialog-footer>
				<div class="footer-content">Optional footer text</div>
				<div class="footer-actions">
					<button type="button" luButton (click)="close()">Confirm</button>
					<button type="button" luButton="text" luDialogDismiss>Cancel</button>
				</div>
			</lu-dialog-footer>
		</lu-dialog>
	`,
	imports: [
		DialogFooterComponent,
		DialogContentComponent,
		DialogHeaderComponent,
		DialogComponent,
		ButtonComponent,
		DialogDismissDirective,
		FormFieldComponent,
		LuSimpleSelectInputComponent,
		FormsModule,
	],
	standalone: true,
})
export class DialogContentStoryComponent {
	ref = injectDialogRef<string>();
	data = injectDialogData<number>();

	legumes = allLegumes;

	close(): void {
		this.ref.close(this.data.toString());
	}
}

@Component({
	selector: 'lu-dialog-story',
	standalone: true,
	template: ` <button luButton (click)="openDialog()">Open dialog</button>`,
	imports: [ButtonComponent],
	providers: [provideLuDialog()],
})
export class DialogStory {
	dialog = inject(LuDialogService);

	openDialog(): void {
		const ref: LuDialogRef<DialogContentStoryComponent> = this.dialog.open({
			content: DialogContentStoryComponent,
			data: 5,
		});

		const res = ref.result$;
	}
}

export default {
	title: 'Documentation/Overlays/Dialog/[Test] Angular Service usage',
	component: DialogStory,
	decorators: [
		applicationConfig({
			providers: [configureLuDialog()],
		}),
	],
} as Meta;

export const Basic: StoryObj = {
	args: {
		size: 'S',
		alert: false,
		mode: 'default',
	},
};
