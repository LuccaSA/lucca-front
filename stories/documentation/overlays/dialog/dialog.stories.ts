import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import {
	DialogComponent,
	DialogContentComponent,
	DialogFooterComponent,
	DialogHeaderComponent,
	DialogOpenDirective,
	injectDialogData,
	injectDialogRef,
	LuDialogRef,
	LuDialogService,
	provideLuDialog,
} from '@lucca-front/ng/dialog';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';

@Component({
	selector: 'test-dialog',
	template: `
		<lu-dialog>
			<lu-dialog-header>Dialog header</lu-dialog-header>

			<lu-dialog-content>Dialog content</lu-dialog-content>

			<lu-dialog-footer>
				<div class="footer-content">Optional footer text</div>
				<div class="footer-actions">
					<button type="button" luButton (click)="close()">Confirm</button>
					<button type="button" luButton="text" (click)="dismiss()">Cancel</button>
				</div>
			</lu-dialog-footer>
		</lu-dialog>
	`,
	imports: [
		ButtonComponent,
		LuSimpleSelectInputComponent,
		DialogHeaderComponent,
		DialogFooterComponent,
		TextInputComponent,
		FormsModule,
		CheckboxInputComponent,
		FormFieldComponent,
		DialogContentComponent,
		DialogComponent,
	],
	standalone: true,
})
class TestDialogContent {
	ref = injectDialogRef<number>();

	close(): void {
		this.ref.close(0);
	}

	dismiss(): void {
		this.ref.dismiss();
	}
}

@Component({
	selector: 'dialog-story',
	template: `
		<button luButton (click)="open()">Open Dialog</button>

		<button luButton [luDialogOpen]="dialogTpl">Open Template-driven Dialog</button>

		<ng-template #dialogTpl>
			<lu-dialog #dialog>
				<lu-dialog-header>Template driven header</lu-dialog-header>

				<lu-dialog-content>Template-driven content</lu-dialog-content>

				<lu-dialog-footer>
					<div class="footer-content">Optional footer text</div>
					<div class="footer-actions">
						<button type="button" luButton (click)="dialog.close()">Confirm</button>
						<button type="button" luButton (click)="closeIn3S(dialog.dialogRef)">Close in 3s</button>
						<button type="button" luButton="text" (click)="dialog.dismiss()">Cancel</button>
					</div>
				</lu-dialog-footer>
			</lu-dialog>
		</ng-template>
	`,
	standalone: true,
	imports: [
		DialogFooterComponent,
		CheckboxInputComponent,
		FormFieldComponent,
		TextInputComponent,
		DialogContentComponent,
		DialogHeaderComponent,
		DialogComponent,
		ButtonComponent,
		FormsModule,
		DialogOpenDirective,
	],
})
class TestDialogStory {
	dialog = inject(LuDialogService);

	open(): void {
		const ref = this.dialog.open({
			content: TestDialogContent,
		});

		ref.closed$.subscribe(console.log);
	}

	closeIn3S(ref: LuDialogRef): void {
		setTimeout(() => {
			ref.close();
		}, 3000);
	}
}

export default {
	title: 'Documentation/Overlays/Dialog/Angular',
	component: TestDialogStory,
	decorators: [
		applicationConfig({
			providers: [provideLuDialog()],
		}),
		moduleMetadata({
			imports: [ButtonComponent],
		}),
	],
} as Meta;

export const Basic: StoryObj = {};
