import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	DialogCloseDirective,
	DialogComponent,
	DialogContentComponent,
	DialogDismissDirective,
	DialogFooterComponent,
	DialogHeaderAction,
	DialogHeaderComponent,
	DialogOpenDirective,
	LuDialogConfig,
	LuDialogService,
} from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

import { HiddenArgType } from '@/helpers/common-arg-types';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';

@Component({
	selector: 'dialog-confirmation-story',
	changeDetection: ChangeDetectionStrategy.OnPush,
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
	providers: [LuDialogService],
	templateUrl: './dialog-confirmation.stories.html',
})
class DialogConfirmationStory {
	mode?: LuDialogConfig<unknown>['mode'];
	autoFocus?: LuDialogConfig<unknown>['autoFocus'];
	dialog = inject(LuDialogService);

	dismiss() {
		this.dialog.open({
			mode: this.mode,
			autoFocus: this.autoFocus,
			content: DialogConfirmationStoryConfirmation,
		});
	}
}

@Component({
	selector: 'dialog-confirmation-story-confirmation',
	changeDetection: ChangeDetectionStrategy.OnPush,
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
	providers: [LuDialogService],
	template: `<lu-dialog #dialog>
		<lu-dialog-header>
			<h1>Confirmation</h1>
		</lu-dialog-header>
		<lu-dialog-content>Lorem ipsum dolor</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost">Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>`,
})
class DialogConfirmationStoryConfirmation {
	dialog = inject(LuDialogService);
	autoFocus?: LuDialogConfig<unknown>['autoFocus'];

	dismiss() {
		this.dialog.open({
			content: DialogConfirmationStory,
			autoFocus: this.autoFocus,
		});
	}
}

export default {
	title: 'Documentation/Overlays/Dialog/Angular/Confirmation',
	component: DialogConfirmationStory,
	argTypes: {
		panelClasses: HiddenArgType,
		mode: {
			options: ['default', 'drawer', 'drawer-from-bottom'],
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

const template = (args: DialogConfirmationStory) => ({
	props: args,
});

export const Basic: StoryObj<DialogConfirmationStory> = {
	args: {
		mode: 'drawer',
		autoFocus: '.open',
	},
	render: template,
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const trigger = canvas.getByRole('button', { name: 'Open Dialog with confirmation on dismiss' });

	await step('The first dialog opens on click', async () => {
		await userEvent.click(trigger);
		await waitForAngular();
		const dialog = await screen.findByRole('dialog');
		await expect(within(dialog).getByRole('heading', { name: 'Dialog' })).toBeVisible();
	});

	await step('Dismissing stacks a confirmation dialog on top of the first one', async () => {
		await userEvent.click(screen.getByRole('button', { name: 'Cancel with confirmation' }));
		await waitForAngular();
		await waitFor(() => expect(screen.getAllByRole('dialog')).toHaveLength(2));
		await expect(screen.getByRole('heading', { name: 'Confirmation' })).toBeVisible();
	});

	await step('Confirming closes the confirmation dialog and leaves the first one open', async () => {
		const confirmation = screen.getAllByRole('dialog')[1];
		await userEvent.click(within(confirmation).getByRole('button', { name: 'Confirm' }));
		await waitFor(() => expect(screen.getAllByRole('dialog')).toHaveLength(1));
		await expect(screen.getByRole('heading', { name: 'Dialog' })).toBeVisible();
	});

	await step('Escape closes the topmost dialog only, then the last one', async () => {
		await userEvent.click(screen.getByRole('button', { name: 'Cancel with confirmation' }));
		await waitFor(() => expect(screen.getAllByRole('dialog')).toHaveLength(2));

		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(screen.getAllByRole('dialog')).toHaveLength(1));

		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
	});
});
