import { ButtonComponent } from '@lucca-front/ng/button';
import { configureLuDialog, DialogComponent, DialogContentComponent, DialogOpenDirective } from '@lucca-front/ng/dialog';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';

export default {
	title: 'Documentation/Overlays/Dropdown/Angular/Dialog',
	decorators: [
		applicationConfig({ providers: [configureLuDialog()] }),
		moduleMetadata({
			imports: [ButtonComponent, LuDropdownTriggerDirective, DropdownMenuComponent, DropdownItemComponent, DropdownActionComponent, DialogOpenDirective, DialogComponent, DialogContentComponent],
		}),
	],
} as Meta;

export const Dialog: StoryObj = {
	render: () => ({
		template: `<button type="button" luButton disclosure [luDropdown]="dropdownSample">Dropdown</button>
<ng-template #dropdownSample>
	<lu-dropdown-menu>
		<lu-dropdown-item>
			<button lu-dropdown-action type="button" [luDialogOpen]="dialogTpl">Open dialog</button>
		</lu-dropdown-item>
	</lu-dropdown-menu>
</ng-template>
<ng-template #dialogTpl>
	<lu-dialog>
		<lu-dialog-content>Backdrop click and Escape close this dialog.</lu-dialog-content>
	</lu-dialog>
</ng-template>`,
	}),
};

export const DialogTEST = createTestStory(Dialog, async ({ canvasElement, step }) => {
	await waitForAngular();
	const trigger = within(canvasElement).getByRole('button', { name: /dropdown/i });

	await step('Opens the dialog from the dropdown action', async () => {
		await userEvent.click(trigger);
		await waitForAngular();
		await userEvent.click(screen.getByRole('button', { name: /open dialog/i }));
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	await step('Closes the dialog with Escape', async () => {
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});
