import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ILuUser } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'user-popover-story',
	template: `<button
		type="button"
		class="userPopover_trigger"
		[luUserPopover]="luUserPopover()"
		[luUserPopoverDisabled]="luUserPopoverDisabled()"
		[luPopoverOpenDelay]="luPopoverOpenDelay()"
		[luPopoverCloseDelay]="luPopoverCloseDelay()"
	>
		Survolez-moi !
	</button>`,
	imports: [LuUserPopoverDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class UserPopoverStory {
	luUserPopover = input<ILuUser>();
	luUserPopoverDisabled = input<boolean>(false);
	luPopoverOpenDelay = input<number>(300);
	luPopoverCloseDelay = input<number>(100);
}

export default {
	title: 'Documentation/Users/Popover/Angular',
	component: UserPopoverStory,
	decorators: [applicationConfig({ providers: [provideAnimations(), provideHttpClient()] })],
	argTypes: {
		luUserPopover: {
			control: { type: 'object' },
			description: 'Utilisateur dont la fiche est affichée au survol ou au focus.',
			table: { category: 'inputs', type: { summary: 'ILuUser' } },
		},
		luUserPopoverDisabled: {
			control: { type: 'boolean' },
			description: 'Désactive l’ouverture de la popover.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		luPopoverOpenDelay: {
			control: { type: 'number' },
			description: 'Délai d’ouverture de la popover (en ms).',
			table: { category: 'inputs', defaultValue: { summary: '300' } },
		},
		luPopoverCloseDelay: {
			control: { type: 'number' },
			description: 'Délai de fermeture de la popover (en ms).',
			table: { category: 'inputs', defaultValue: { summary: '100' } },
		},
	},
} as Meta;

export const Basic: StoryObj<UserPopoverStory> = {
	args: {
		luUserPopover: { id: 1, firstName: 'Chloe', lastName: 'Alibert' },
		luUserPopoverDisabled: false,
		luPopoverOpenDelay: 300,
		luPopoverCloseDelay: 100,
	},
};

Basic.parameters = {
	controls: {
		include: ['luUserPopover', 'luUserPopoverDisabled', 'luPopoverOpenDelay', 'luPopoverCloseDelay'],
	},
};
