import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuUserDisplayModule, LuUserPictureComponent } from '@lucca-front/ng/user';
import { LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/user-popover';
import { applicationConfig, Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface IndexTableActionsTooltipsRowStory {}

export default {
	title: 'Documentation/Listings/Index Table/Actions/Tooltips/Row',
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

function getTemplate(args: IndexTableActionsTooltipsRowStory): string {
	return `<table class="indexTable mod-layoutFixed">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Action</th>
			<th class="indexTable-head-row-cell" scope="col">Content</th>
			<th class="indexTable-head-row-cell" scope="col">Content</th>
			<th class="indexTable-head-row-cell" scope="col">Content</th>
			<th class="indexTable-head-row-cell" scope="col" style="--components-indexTable-cell-fixed-width: 8">Content</th>
			<th class="indexTable-head-row-cell mod-alignRight" scope="col" style="--components-indexTable-cell-fixed-width: 3"><span class="pr-u-mask">Secondary action</span></th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell pr-u-cursorPointer" (click)="message('Primary action')">
				<!-- real link with navigation and stopPropagation to prevent double navigation -->
				<!-- pr-u-widthFitContent to contain de width and center the tooltip -->
				<!-- preventDefault is only here for demonstration -->
				<a href="#primaryNavigation" luTooltip="Primary action (you can click)" class="indexTable-body-row-cell-link pr-u-widthFitContent pr-u-ellipsis" (click)=" $event.preventDefault(); $event.stopPropagation(); message('Primary action')">Tooltip for the row <code class="code">a</code></a>
			</td>
			<td class="indexTable-body-row-cell pr-u-cursorPointer" (click)="message('Primary action')">
				<div class="pr-u-ellipsis" luTooltip luTooltipWhenEllipsis>Tooltip when ellipsis</div>
			</td>
			<td class="indexTable-body-row-cell pr-u-whiteSpaceNowrap mod-allowTextSelection">Selectable</td>
			<td class="indexTable-body-row-cell pr-u-cursorPointer" (click)="message('Primary action')">
				<!-- pr-u-widthFitContent to contain the width and center the tooltip -->
				<div class="pr-u-ellipsis pr-u-widthFitContent pr-u-focusVisible pr-u-borderRadiusM" luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">Tooltip</div>
			</td>
			<td class="indexTable-body-row-cell pr-u-cursorPointer pr-u-whiteSpaceNowrap" (click)="message('Primary action')">
				Content
			</td>
			<td class="indexTable-body-row-cell mod-alignRight mod-actions">
				<button luTooltip="Secondary action (you can click)" luTooltipOnlyForDisplay (click)="message('Secondary action')" type="button" class="button mod-critical indexTable-body-row-cell-subAction">
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
				</button>
			</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell pr-u-cursorPointer" (click)="message('Primary action')">
				<!-- nothing here, the event will be bubbling -->
				<!-- pr-u-widthFitContent to contain de width and center the tooltip -->
				<button luTooltip="Primary action (you can click)" type="button" class="indexTable-body-row-cell-link pr-u-widthFitContent pr-u-ellipsis">Tooltip for the row <code class="code">button</code></button>
			</td>
			<td class="indexTable-body-row-cell pr-u-cursorPointer" (click)="message('Primary action')">
				<div class="pr-u-ellipsis" luTooltip luTooltipWhenEllipsis>Tooltip when ellipsis</div>
			</td>
			<td class="indexTable-body-row-cell pr-u-whiteSpaceNowrap mod-allowTextSelection">Selectable</td>
			<!-- pr-u-widthFitContent to contain de width and center the tooltip -->
			<td class="indexTable-body-row-cell pr-u-cursorPointer" (click)="message('Primary action')">
				<div class="pr-u-ellipsis pr-u-widthFitContent pr-u-focusVisible pr-u-borderRadiusM" luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">Tooltip</div>
			</td>
			<td class="indexTable-body-row-cell pr-u-cursorPointer pr-u-whiteSpaceNowrap" (click)="message('Primary action')">
				Content
			</td>
			<td class="indexTable-body-row-cell mod-alignRight mod-actions">
				<button luTooltip="Secondary action (you can click)" luTooltipOnlyForDisplay (click)="message('Secondary action')" type="button" class="button mod-critical indexTable-body-row-cell-subAction">
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
				</button>
			</td>
		</tr>
	</tbody>
</table>
`;
}

const Template: StoryFn<IndexTableActionsTooltipsRowStory> = (args) => ({
	props: {
		...args,
		message: (msg) => {
			alert(msg);
		},
	},
	template: getTemplate(args),
});

export const TooltipsRow = Template.bind({});
