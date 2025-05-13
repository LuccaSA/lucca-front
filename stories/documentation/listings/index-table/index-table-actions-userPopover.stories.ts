import { bob } from '@/stories/users/user.mocks';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/popup-employee';
import { LuUserDisplayModule, LuUserPictureComponent } from '@lucca-front/ng/user';
import { applicationConfig, Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface IndexTableActionsUserPopoverCellStory {}

export default {
	title: 'Documentation/Listings/Index Table/Actions/User popover',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [LuUserPopoverDirective, LuUserDisplayModule, LuUserPictureComponent],
		}),
		applicationConfig({
			providers: [provideAnimations(), provideLuUserPopover(), provideHttpClient()],
		}),
	],
} as Meta;

function getTemplate(args: IndexTableActionsUserPopoverCellStory): string {
	return `<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<button class="indexTable-body-row-cell-link" type="button"><span class="u-mask">See details</span></button>
				<div class="u-displayFlex u-widthFitContent pr-u-gap50 pr-u-focusVisible u-borderRadiusM" [luUserPopover]="bob">
					<lu-user-picture class="mod-XS" [user]="bob" />
					{{ bob | luUserDisplay:'lf' }} with userPopover
				</div>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>
`;
}

const Template: StoryFn<IndexTableActionsUserPopoverCellStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const UserPopover = Template.bind({});
UserPopover.args = { bob };
