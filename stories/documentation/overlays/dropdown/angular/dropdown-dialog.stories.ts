import { ButtonComponent } from '@lucca-front/ng/button';
import { configureLuDialog, DialogComponent, DialogContentComponent, DialogOpenDirective } from '@lucca-front/ng/dialog';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

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
