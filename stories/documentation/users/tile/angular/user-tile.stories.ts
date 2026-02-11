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
			template: `<div class="pr-u-displayFlex pr-u-gap300">
	<button [luUserPopover]="bob" type="button" class="userPopover_trigger">
		<lu-user-tile [user]="bob" />
	</button>
	<lu-user-tile [user]="bob" displayFormat="LF" role="Administrateur" />
	<lu-user-tile [user]="bob" size="L" />
</div>`,
		};
	},
} as Meta;

export const Basic: StoryObj<LuUserTileComponent> = {};
