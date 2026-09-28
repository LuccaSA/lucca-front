import { allLegumes } from '@/stories/forms/select/select.utils';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { Meta, StoryObj, applicationConfig } from '@storybook/angular-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';

@Component({
	selector: 'sb-dialog-content',
	template: `
		<lu-dialog>
			<lu-dialog-header>Header</lu-dialog-header>

			<lu-dialog-content>
				<lu-form-field label="Test">
					<lu-simple-select ngModel [options]="legumes" />
				</lu-form-field>
				<lu-form-field label="Test">
					<lu-simple-select ngModel [options]="legumes" />
				</lu-form-field>
				<lu-form-field label="Test">
					<lu-simple-select ngModel [options]="legumes" />
				</lu-form-field>
				<lu-form-field label="Test">
					<lu-simple-select ngModel [options]="legumes" />
				</lu-form-field>
			</lu-dialog-content>

			<lu-dialog-footer>
				<div class="footer-content">Optional footer text</div>
				<div class="footer-actions">
					<button type="button" luButton (click)="close()">Confirm</button>
					<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DialogContentStoryComponent {
	ref = injectDialogRef<string>();
	data = injectDialogData<number>();

	legumes = allLegumes;

	close(): void {
		this.ref.close(this.data.toString());
	}
}

@Component({
	selector: 'lu-dialog-story',
	template: ` <button luButton (click)="openDialog()">Open dialog</button>`,
	imports: [ButtonComponent],
	providers: [provideLuDialog()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DialogStory {
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

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const trigger = canvas.getByRole('button', { name: 'Open dialog' });
	const expectClosed = () => waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
	const openDialog = async () => {
		await userEvent.click(trigger);
		await waitForAngular();
		return screen.findByRole('dialog');
	};

	await step('Opening through LuDialogService renders the dialog content component', async () => {
		const dialog = await openDialog();
		await expect(dialog).toBeVisible();
		await expect(within(dialog).getByText('Header')).toBeVisible();
		await expect(within(dialog).getAllByRole('combobox')).toHaveLength(4);
	});

	await step('Confirm closes the dialog through the injected LuDialogRef', async () => {
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Confirm' }));
		await expectClosed();
	});

	await step('Cancel closes the dialog through luDialogDismiss', async () => {
		await openDialog();
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cancel' }));
		await expectClosed();
	});

	await step('The header close button closes the dialog', async () => {
		await openDialog();
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Fermer' }));
		await expectClosed();
	});

	await step('The dialog opens with Enter and closes with Escape', async () => {
		trigger.focus();
		await expect(trigger).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(await screen.findByRole('dialog')).toBeVisible();

		await userEvent.keyboard('{Escape}');
		await expectClosed();
	});
});
