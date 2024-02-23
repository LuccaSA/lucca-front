import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	DialogComponent,
	DialogContentComponent,
	DialogFooterComponent,
	DialogHeaderComponent,
	DialogOpenDirective,
	LuDialogConfig,
	LuDialogService,
	injectDialogRef,
	provideLuDialog,
} from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { DialogCloseDirective, DialogDismissDirective } from '@lucca-front/ng/dialog';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';

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
	imports: [ButtonComponent, DialogHeaderComponent, DialogFooterComponent, CheckboxInputComponent, DialogContentComponent, DialogComponent],
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
	template: ` <button luButton (click)="open()">Open Dialog</button> `,
	standalone: true,
	imports: [DialogFooterComponent, CheckboxInputComponent, FormFieldComponent, TextInputComponent, DialogContentComponent, DialogHeaderComponent, DialogComponent, ButtonComponent, FormsModule],
})
class TestDialogStory {
	dialog = inject(LuDialogService);

	config: LuDialogConfig<TestDialogContent>;

	open(): void {
		const ref = this.dialog.open({
			content: TestDialogContent,
			size: 'fullScreen',
		});

		ref.closed$.subscribe(console.log);
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
			imports: [
				ButtonComponent,
				DialogOpenDirective,
				DialogHeaderComponent,
				DialogFooterComponent,
				CheckboxInputComponent,
				DialogContentComponent,
				DialogComponent,
				DialogCloseDirective,
				DialogDismissDirective,
				FormFieldComponent,
				TextInputComponent,
				FormsModule,
				ReactiveFormsModule,
			],
		}),
	],
	render: (args) => {
		return {
			props: {
				config: args,
			},
			template: `<!-- config: ${JSON.stringify(args)} -->

<button luButton [luDialogOpen]="dialogTpl" [luDialogConfig]="config">Open Template-driven Dialog</button>

<ng-template #dialogTpl>
	<lu-dialog #dialog>
		<lu-dialog-header>Template driven header</lu-dialog-header>

		<lu-dialog-content>Template-driven content</lu-dialog-content>

		<lu-dialog-footer>
			<div class="footer-content">Optional footer text</div>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="text" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>`,
		};
	},
	argTypes: {
		mode: {
			options: ['default', 'drawer', 'drawer-from-bottom'],
			control: {
				type: 'select',
			},
		},
		autoFocus: {
			options: ['first-tabbable', 'first-input'],
			description: 'Peut aussi être un sélecteur CSS',
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		size: 'S',
		alert: false,
		mode: 'default',
	},
};

export const Focus: StoryObj = {
	render: (args) => {
		return {
			props: {
				config: args,
			},
			template: `<!-- config: ${JSON.stringify(args)} -->

<button luButton [luDialogOpen]="dialogTpl" [luDialogConfig]="config">Open Template-driven Dialog</button>

<ng-template #dialogTpl>
	<lu-dialog #dialog>
		<lu-dialog-header>Template driven header</lu-dialog-header>

		<lu-dialog-content>
			<lu-form-field label="Example input">
				<lu-text-input [ngModel]="example" placeholder="This will be focused if autoFocus is set to first-input"></lu-text-input>
			</lu-form-field>
		</lu-dialog-content>

		<lu-dialog-footer>
			<div class="footer-content">Optional footer text</div>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="text" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>`,
		};
	},
	args: {
		size: 'S',
		alert: false,
		mode: 'default',
		autoFocus: 'first-tabbable',
	},
};

export const WithForm: StoryObj = {
	render: (args) => {
		return {
			props: {
				config: args,
				form: new FormGroup({
					example: new FormControl('', Validators.required),
				}),
			},
			template: `<!-- config: ${JSON.stringify(args)} -->

<button luButton [luDialogOpen]="dialogTpl" [luDialogConfig]="config">Open Template-driven Dialog with Form inside</button>

<ng-template #dialogTpl>
	<lu-dialog #dialog>
<!--form = new FormGroup({
			example: new FormControl('', Validators.required)
		})-->
		<form [formControl]="form" class="dialog-form">
			<lu-dialog-header>Template driven header with Form inside</lu-dialog-header>

			<lu-dialog-content>
				<lu-form-field label="Example input">
					<lu-text-input formControlName="example" placeholder="This will be focused if autoFocus is set to first-input"></lu-text-input>
				</lu-form-field>
			</lu-dialog-content>

			<lu-dialog-footer>
				<div class="footer-content">Optional footer text</div>
				<div class="footer-actions">
					<button type="submit" luButton [disabled]="!form.valid" luDialogClose>Submit</button>
					<button type="button" luButton="text" luDialogDismiss>Cancel</button>
				</div>
			</lu-dialog-footer>
		</form>
	</lu-dialog>
</ng-template>`,
		};
	},
	args: {
		size: 'S',
		alert: false,
		mode: 'default',
		autoFocus: 'first-tabbable',
	},
};
