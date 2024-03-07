import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { EmployeeCardTriggerModule, LuEmployeeCardTriggerDirective } from '@lucca-front/ng/popup-employee';
import { applicationConfig, Meta, moduleMetadata, StoryFn, StoryObj } from '@storybook/angular';
import { bob } from '@/stories/users/user.mocks';
import { LuDisplayInitials } from '../../../../packages/ng/user/display';
import { Component, Input, Optional } from '@angular/core';
import { ILuUser } from '../../../../packages/ng/user/user.model';


@Component({
	imports: [ OverlayModule, EmployeeCardTriggerModule ],
	selector: 'user-popover-story',
	standalone: true,
	template: '<div [luEmployeeCard]="luEmployeeCard" [luEmployeeCardEnterDelay]="luEmployeeCardEnterDelay" [luEmployeeCardLeaveDelay]="luEmployeeCardLeaveDelay" [luEmployeeCardDisabled]="luEmployeeCardDisabled" >Coucou !</div>',
})
class UserPopoverStory {
	@Input() luEmployeeCard: ILuUser;
	@Input() luEmployeeCardEnterDelay = 300;
	@Input() luEmployeeCardLeaveDelay = 200;
	@Input() luEmployeeCardDisabled = false;
}

export default {
	title: 'Documentation/Overlays/user-popover',
	component: UserPopoverStory,
	decorators: [applicationConfig({ providers: [provideAnimations(), provideHttpClient()] })],
	argsTypes: {
		luEmployeeCard: { control: { type: 'object' } },
		luEmployeeCardEnterDelay: { control: { type: 'number' } },
		luEmployeeCardLeaveDelay: { control: { type: 'number' } },
		luEmployeeCardDisabled: { control: { type: 'boolean' } },
	},
} as Meta;

const template: StoryFn<UserPopoverStory> = (args) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {
	luEmployeeCard: { id: 1, firstName: 'Chloe', lastName: 'Alibert' },
	luEmployeeCardEnterDelay: 300,
	luEmployeeCardLeaveDelay: 200,
	luEmployeeCardDisabled: false,
};

Basic.parameters = {
	controls: {
		include: ['luEmployeeCard', 'luEmployeeCardEnterDelay', 'luEmployeeCardLeaveDelay', 'luEmployeeCardDisabled'],
	}
}
