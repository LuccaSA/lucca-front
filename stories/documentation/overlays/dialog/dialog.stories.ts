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

// TODO document use of .luDialog-autofocus to redirect focus

@Component({
	selector: 'test-dialog',
	template: `
		<lu-dialog>
			<lu-dialog-header>I'm a test dialog ! Hello {{ world }}</lu-dialog-header>

			<lu-dialog-content>
				I'm the content of the dialog !
				<lu-form-field label="Test focus" inlineMessage="This is just a test input to check autofocus">
					<lu-text-input placeholder="This should be focused" ngModel=""></lu-text-input>
				</lu-form-field>
				<div class="divider"></div>
				<lu-form-field label="Can dismiss" inlineMessage="Check this box to be able to close using the X button ,backdrop click or escape">
					<lu-checkbox-input [(ngModel)]="canClose"></lu-checkbox-input>
				</lu-form-field>
			</lu-dialog-content>

			<lu-dialog-footer>
				<div class="footer-content">Footer text !</div>
				<div class="footer-actions">
					<button type="button" luButton (click)="close()">Confirm</button>
					<button type="button" luButton="text" (click)="close()">Cancel</button>
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
	world = injectDialogData<string>();
	ref = injectDialogRef<number>();

	canClose = false;

	close(): void {
		this.ref.close(0);
	}
}

@Component({
	selector: 'dialog-story',
	template: `
		<button luButton (click)="open()">Open Dialog</button>

		<button luButton [luDialogOpen]="dialogTpl">Open Template-driven Dialog</button>

		<ng-template #dialogTpl>
			<lu-dialog #dialog>
				<lu-dialog-header>I'm a template driven header</lu-dialog-header>

				<lu-dialog-content>
					I'm the content of the dialog !
					<lu-form-field label="Test focus" inlineMessage="This is just a test input to check autofocus">
						<lu-text-input placeholder="This should be focused" ngModel=""></lu-text-input>
					</lu-form-field>
				</lu-dialog-content>

				<lu-dialog-footer>
					<div class="footer-content">Footer text !</div>
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
			data: 'World',
			canClose: (c) => c.canClose,
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
