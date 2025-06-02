import { provideAnimations } from '@angular/platform-browser/animations';
import { LuUserTileComponent } from '@lucca-front/ng/user';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { provideLuUserPopover, LuUserPopoverDirective } from '@lucca-front/ng/popup-employee';
import { bob } from '@/stories/users/user.mocks';

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
					<lu-user-tile [user]="bob" [luUserPopover]="bob"></lu-user-tile>
				</div>
				<div class="pr-u-marginInlineStart300">
					<lu-user-tile [user]="bob" displayFormat="LF" role="Administrateur" [luUserPopover]="bob"></lu-user-tile>
				</div>
			</div>`,
		};
	},
} as Meta;

export const Basic: StoryObj<LuUserTileComponent> = {};
