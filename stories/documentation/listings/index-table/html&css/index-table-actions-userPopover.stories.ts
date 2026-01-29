import { bob } from '@/stories/users/user.mocks';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuUserDisplayModule, LuUserPictureComponent } from '@lucca-front/ng/user';
import { LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/user-popover';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface IndexTableActionsUserPopoverCellStory {}

export default {
	title: 'Documentation/Listings/Index Table/HTML&CSS/Actions/User popover',
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
				<button class="indexTable-body-row-cell-link" type="button"><span class="pr-u-mask">See details</span></button>
				<button class="userPopover_trigger" [luUserPopover]="bob">
					<span>
						<lu-user-picture size="XS" [user]="bob" />
						<span translate="no" class="pr-u-marginInlineStart100">{{ bob | luUserDisplay:'lf' }}</span> with userPopover
					</span>
				</button>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>`;
}

const Template = (args: IndexTableActionsUserPopoverCellStory) => ({
	props: args,
	template: getTemplate(args),
});

export const UserPopover: StoryObj<IndexTableActionsUserPopoverCellStory> = {
	args: { bob },
	render: Template,
};
