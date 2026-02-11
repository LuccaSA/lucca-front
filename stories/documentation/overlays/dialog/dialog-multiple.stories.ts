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
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';
import { createTestStory } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';

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

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	const canvas = within(canvasElement);
	const button = await canvas.findByRole('button');

	await step('Keyboard interactions', async () => {
		button.focus();
		await expect(button).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(screen.getAllByRole('dialog').length).toEqual(2);
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.getAllByRole('dialog').length).toEqual(1);
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByText('dialog')).toBeNull();
	});

	await step('Mouse interaction', async () => {
		await userEvent.click(button);
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		// open other dialog
		await userEvent.click(screen.getAllByRole('button')[1]);
		await waitForAngular();
		// close with confirm button
		await expect(screen.getAllByRole('dialog').length).toEqual(2);
		await userEvent.click(screen.getAllByRole('button')[4]);
		await waitForAngular();
		await expect(screen.getAllByRole('dialog').length).toEqual(1);
		// close with dialog cross
		await userEvent.click(screen.getAllByRole('button')[2]);
		await waitForAngular();
		await expect(screen.queryByText('dialog')).toBeNull();
	});
});
