import { OVERLAY_DEFAULT_CONFIG } from '@angular/cdk/overlay';
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
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { HiddenArgType } from '@/helpers/common-arg-types';
import { allLegumes } from '@/stories/forms/select/select.utils';

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
				LuSimpleSelectInputComponent,
				LuMultiSelectInputComponent,
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
	<lu-dialog #dialog stacked>
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
	<lu-dialog #dialog stacked>
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
	<lu-dialog #dialog stacked>
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
	<lu-dialog #dialog stacked>
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



<ng-template #dialogTpl5>
	<lu-dialog #dialog stacked>
		<lu-dialog-header>
			<h1>Dialog 5</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined">This is the end</button>
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
			options: ['default', 'drawer', 'drawer-from-bottom', 'sheet', ''],
			control: {
				type: 'select',
			},
			table: { category: 'inputs' },
		},
		size: {
			options: ['fitContent', 'XS', 'S', '', 'L', 'XL', 'XXL', 'maxContent', 'fullScreen'],
			control: {
				type: 'select',
			},
			table: { category: 'inputs' },
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

export const WithoutPopoverTopLayer: StoryObj = {
	...Basic,
	name: 'Without the popover top layer',
	decorators: [
		applicationConfig({
			providers: [{ provide: OVERLAY_DEFAULT_CONFIG, useValue: { usePopover: false } }],
		}),
	],
	parameters: {
		docs: {
			description: {
				story:
					'An app can opt out of the cdk popover top layer, for instance to keep its toasts above dialogs. The backdrop is then a sibling of the overlay wrapper instead of one of its children: the dialogs must stack all the same.',
			},
		},
	},
};

export const WithSelect: StoryObj = {
	...Basic,
	name: 'With a select',
	render: (args) => ({
		props: {
			config: args,
			legumes: allLegumes,
		},
		template: `
<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl1" [luDialogConfig]="config">Open Dialog</button>

<ng-template #dialogTpl1>
	<lu-dialog stacked>
		<lu-dialog-header>
			<h1>Dialog 1</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<lu-form-field label="Legume">
				<lu-simple-select [(ngModel)]="legume" [options]="legumes" />
			</lu-form-field>
			<button class="open pr-u-marginBlockStart200" luButton="outlined" [luDialogOpen]="dialogTpl2" [luDialogConfig]="config">Open Dialog</button>
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
	<lu-dialog stacked>
		<lu-dialog-header>
			<h1>Dialog 2</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<lu-form-field label="Legumes">
				<lu-multi-select [(ngModel)]="legumesSelection" [options]="legumes" />
			</lu-form-field>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>`,
	}),
	parameters: {
		docs: {
			description: {
				story: 'Below the XS breakpoint, a select opens as a sheet. Over a `stacked` dialog, the sheet joins the stack: the dialogs below recede by one level each.',
			},
		},
	},
};
