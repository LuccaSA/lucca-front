import { provideHttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ILuUser } from '@lucca-front/ng/user';
import { LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/user-popover';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'user-popover-story',
	standalone: true,
	template: '<div [luUserPopover]="luUserPopover" [luUserPopoverDisabled]="luUserPopoverDisabled">Survolez-moi !</div>',
	imports: [LuUserPopoverDirective],
})
class UserPopoverStory {
	@Input() luUserPopover: ILuUser;
	@Input() luUserPopoverEnterDelay = 300;
	@Input() luUserPopoverLeaveDelay = 200;
	@Input() luUserPopoverDisabled = false;
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
