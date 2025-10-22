import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	configureLuDialog,
	DialogCloseDirective,
	DialogComponent,
	DialogContentComponent,
	DialogDismissDirective,
	DialogFooterComponent,
	DialogHeaderAction,
	DialogHeaderComponent,
	DialogOpenDirective,
} from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { TestComponent } from '@lucca-front/ng/test';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';

export default {
	title: 'Documentation/Overlays/Dialog/Angular/Multiple',
	decorators: [
		applicationConfig({
			providers: [configureLuDialog()],
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
				IconComponent,
				DialogHeaderAction,
				TestComponent,
			],
		}),
	],
	render: (args) => {
		return {
			props: {
				config: args,
			},
			template: `
@let config = ${JSON.stringify(args)};

<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl1" [luDialogConfig]="config">Open Dialog</button>

<ng-template #dialogTpl1>
	<lu-dialog #dialog>
		<lu-dialog-header>
			<h1>Dialog 1</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl2" [luDialogConfig]="config">Open Dialog</button>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>

<ng-template #dialogTpl2>
	<lu-dialog #dialog>
		<lu-dialog-header>
			<h1>Dialog 2</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl3" [luDialogConfig]="config">Open Dialog</button>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>

<ng-template #dialogTpl3>
	<lu-dialog #dialog>
		<lu-dialog-header>
			<h1>Dialog 3</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl4" [luDialogConfig]="config">Open Dialog</button>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>

<ng-template #dialogTpl4>
	<lu-dialog #dialog>
		<lu-dialog-header>
			<h1>Dialog 4</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl5" [luDialogConfig]="config">Open Dialog</button>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>

@let test = false;

<ng-template #dialogTpl5>
	<lu-dialog #dialog>
		<lu-dialog-header>
			<h1>Dialog 5</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<lu-test />
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>`,
		};
	},
	argTypes: {
		panelClasses: HiddenArgType,
		mode: {
			options: ['default', 'drawer', 'drawer-from-bottom'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['fitContent', 'XS', 'S', '', 'L', 'XL', 'XXL', 'maxContent', 'fullScreen'],
			control: {
				type: 'select',
			},
		},
		autoFocus: HiddenArgType,
		alert: HiddenArgType,
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		mode: 'drawer',
		autoFocus: '.open',
	},
};
