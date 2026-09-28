import { allLegumes } from '@/stories/forms/select/select.utils';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
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
import { sleep, waitForAngular } from '@/helpers/test';

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

	canClose = input<boolean>(true);
	canCloseWithBackdrop = input<boolean>(true);

	openDialog(): void {
		const ref: LuDialogRef<DialogContentStoryComponent> = this.dialog.open({
			content: DialogContentStoryComponent,
			data: 5,
			canClose: () => this.canClose(),
			canCloseWithBackdrop: this.canCloseWithBackdrop(),
		});

		const res = ref.result$;
	}
}

export default {
	title: 'Documentation/Overlays/Dialog/canClose',
	component: DialogStory,
	decorators: [
		applicationConfig({
			providers: [configureLuDialog()],
		}),
	],
	argTypes: {
		canClose: {
			control: {
				type: 'boolean',
			},
			description: 'Permet de définir si la fenêtre de dialogue peut être fermée via les différentes méthodes de fermeture (bouton cancel, clic sur le backdrop, etc.).',
			table: { category: 'inputs' },
		},
		canCloseWithBackdrop: {
			control: {
				type: 'boolean',
			},
			description: 'Permet de définir si la fenêtre de dialogue peut être fermée via un clic sur le backdrop.',
			table: { category: 'inputs' },
		},
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		canClose: true,
		canCloseWithBackdrop: true,
	},
	parameters: {
		docs: {
			source: {
				language: 'ts',
				type: 'code',
				code: `
canClose = input<boolean>(true);
canCloseWithBackdrop = input<boolean>(true);

openDialog(): void {
  const ref: LuDialogRef<DialogContentStoryComponent> = this.dialog.open({
    content: DialogContentStoryComponent,
    data: 5,
    canClose: () => this.canClose(),
    canCloseWithBackdrop: this.canCloseWithBackdrop(),
  });
`,
			},
		},
	},
};

const openDialog = async (trigger: HTMLElement) => {
	await userEvent.click(trigger);
	await waitForAngular();
	return screen.findByRole('dialog');
};

const expectClosed = () => waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

/** Gives the close attempt time to go through before asserting the dialog is still there. */
const expectStillOpen = async () => {
	await sleep(100);
	await expect(screen.getByRole('dialog')).toBeVisible();
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const trigger = canvas.getByRole('button', { name: 'Open dialog' });

	await step('Escape closes the dialog when canClose allows it', async () => {
		const dialog = await openDialog(trigger);
		await expect(dialog).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await expectClosed();
	});

	await step('Cancel closes the dialog when canClose allows it', async () => {
		await openDialog(trigger);
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cancel' }));
		await expectClosed();
	});

	await step('Confirm closes the dialog through the injected LuDialogRef', async () => {
		await openDialog(trigger);
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Confirm' }));
		await expectClosed();
	});
});

export const CannotCloseTEST = createTestStory({ ...Basic, args: { ...Basic.args, canClose: false } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const trigger = canvas.getByRole('button', { name: 'Open dialog' });
	await openDialog(trigger);

	await step('Escape does not close a dialog denied by canClose', async () => {
		await userEvent.keyboard('{Escape}');
		await expectStillOpen();
	});

	await step('Cancel does not close a dialog denied by canClose', async () => {
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cancel' }));
		await expectStillOpen();
	});

	await step('Confirm still closes it, as LuDialogRef.close bypasses canClose', async () => {
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Confirm' }));
		await expectClosed();
	});
});

export const CannotCloseWithBackdropTEST = createTestStory({ ...Basic, args: { ...Basic.args, canCloseWithBackdrop: false } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const trigger = canvas.getByRole('button', { name: 'Open dialog' });
	await openDialog(trigger);

	await step('Escape is ignored, as it goes through the same stream as the backdrop click', async () => {
		await userEvent.keyboard('{Escape}');
		await expectStillOpen();
	});

	await step('Cancel still closes the dialog', async () => {
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cancel' }));
		await expectClosed();
	});
});
