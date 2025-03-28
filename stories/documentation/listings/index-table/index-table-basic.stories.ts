import { bob } from '@/stories/users/user.mocks';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/popup-employee';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuUserDisplayModule, LuUserPictureComponent } from '@lucca-front/ng/user';
import { applicationConfig, Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface IndexTableBasicStory {}

export default {
	title: 'Documentation/Listings/Index Table/Basic',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [LuTooltipModule, LuUserPopoverDirective, LuUserDisplayModule, LuUserPictureComponent],
		}),
		applicationConfig({
			providers: [provideAnimations(), provideLuUserPopover(), provideHttpClient()],
		}),
	],
} as Meta;

function getTemplate(args: IndexTableBasicStory): string {
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
				<a href="#" class="indexTable-body-row-cell-link">Content <code class="code">a</code></a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<button type="button" class="indexTable-body-row-cell-link">Content <code class="code">button</code></button>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell mod-allowTextSelection">
				Content selectable
			</td>
			<td class="indexTable-body-row-cell">
				Content
			</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link"><span class="u-mask">See details</span></a>
				<span luTooltip="This is a tooltip">Content with tooltip</span>
			</td>
			<td class="indexTable-body-row-cell"><a href="#">Content actionable</a></td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<button class="indexTable-body-row-cell-link" type="button"><span class="u-mask">See details</span></button>
				<div class="u-displayFlex pr-u-gap50" [luUserPopover]="bob"><lu-user-picture class="mod-XS" [user]="bob"></lu-user-picture>{{ bob | luUserDisplay:'lf' }} (with userPopover)</div>
			</td>
			<td class="indexTable-body-row-cell"><span luTooltip="This is a tooltip">Content with tooltip</span></td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<!-- indexTable-body-row-cell-action is deprecated -->
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-action">Action</a>
				Content (with deprecated action)
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<IndexTableBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { bob };
