import { bob } from '@/stories/users/user.mocks';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuUserTileComponent } from '@lucca-front/ng/user';
import { LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/user-popover';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Users/Tile/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [LuUserTileComponent, LuUserPopoverDirective],
		}),
		applicationConfig({
			providers: [provideAnimations(), provideHttpClient(), provideLuUserPopover()],
		}),
	],
	render: () => {
		return {
			props: {
				bob,
			},
			template: `<div class="u-displayFlex">
	<div>
		<lu-user-tile [user]="bob" />
	</div>
	<div class="pr-u-marginInlineStart300">
		<lu-user-tile [user]="bob" displayFormat="LF" role="Administrateur" />
	</div>
</div>`,
		};
	},
} as Meta;

export const Basic: StoryObj<LuUserTileComponent> = {};
