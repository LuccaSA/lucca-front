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
			template: `<div class="u-displayFlex pr-u-gap300">
				<button [luUserPopover]="bob" type="button" class="u-buttonReset u-inlineSizeFitContent pr-u-focusVisible u-borderRadiusM">
					<lu-user-tile [user]="bob" />
				</button>
				<button [luUserPopover]="bob" type="button" class="u-buttonReset u-inlineSizeFitContent pr-u-focusVisible u-borderRadiusM">
					<lu-user-tile [user]="bob" displayFormat="LF" role="Administrateur" />
				</button>
			</div>`,
		};
	},
} as Meta;

export const Basic: StoryObj<LuUserTileComponent> = {};
