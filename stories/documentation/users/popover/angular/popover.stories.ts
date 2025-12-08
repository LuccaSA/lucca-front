import { provideHttpClient } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ILuUser } from '@lucca-front/ng/user';
import { LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/user-popover';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'user-popover-story',
	template: '<button type="button" class="userPopover_trigger" [luUserPopover]="luUserPopover()" [luUserPopoverDisabled]="luUserPopoverDisabled()">Survolez-moi !</button>',
	imports: [LuUserPopoverDirective],
})
class UserPopoverStory {
	luUserPopover = input<ILuUser>();
	luUserPopoverEnterDelay = input<number>(300);
	luUserPopoverLeaveDelay = input<number>(200);
	luUserPopoverDisabled = input<boolean>(false);
}

export default {
	title: 'Documentation/Users/Popover/Angular',
	component: UserPopoverStory,
	decorators: [applicationConfig({ providers: [provideAnimations(), provideHttpClient(), provideLuUserPopover()] })],
	argsTypes: {
		luUserPopover: { control: { type: 'object' } },
		luUserPopoverEnterDelay: { control: { type: 'number' } },
		luUserPopoverLeaveDelay: { control: { type: 'number' } },
		luUserPopoverDisabled: { control: { type: 'boolean' } },
	},
} as Meta;

const template: StoryFn<UserPopoverStory> = (args) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {
	luUserPopover: { id: 1, firstName: 'Chloe', lastName: 'Alibert' },
	luUserPopoverEnterDelay: 300,
	luUserPopoverLeaveDelay: 200,
	luUserPopoverDisabled: false,
};

Basic.parameters = {
	controls: {
		include: ['luUserPopover', 'luUserPopoverEnterDelay', 'luUserPopoverLeaveDelay', 'luUserPopoverDisabled'],
	},
};
