import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/popup-employee';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuUserDisplayModule, LuUserPictureComponent } from '@lucca-front/ng/user';
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
			<th class="indexTable-head-row-cell mod-alignRight" scope="col" style="--components-indexTable-cell-fixed-width: 3"><span class="u-mask">Secondary action</span></th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<!-- (click) with navigation on table row -->
		<tr class="indexTable-body-row" (click)="message('Primary action')">
			<td class="indexTable-body-row-cell u-cursorPointer">
				<!-- real link with navigation and stopPropagation to prevent double navigation -->
				<!-- u-widthFitContent to contain de width and center the tooltip -->
				<!-- preventDefault is only here for demonstration -->
				<a href="#primaryNavigation" luTooltip="Primary action (you can click)" class="indexTable-body-row-cell-link u-widthFitContent u-ellipsis" (click)=" $event.preventDefault(); $event.stopPropagation(); message('Primary action')">Tooltip for the row <code class="code">a</code></a>
			</td>
			<td class="indexTable-body-row-cell u-cursorPointer"><div class="u-ellipsis" luTooltip luTooltipWhenEllipsis>Tooltip when ellipsis</div></td>
			<!-- stopPropagation on the table data cell with a mod-allowTextSelection -->
			<td class="indexTable-body-row-cell u-whiteSpaceNowrap mod-allowTextSelection" (click)="$event.stopPropagation()">Selectable</td>
			<td class="indexTable-body-row-cell u-cursorPointer">
				<!-- u-widthFitContent to contain the width and center the tooltip -->
				<div class="u-ellipsis u-widthFitContent pr-u-focusVisible u-borderRadiusM" luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">Tooltip</div>
			</td>
			<td class="indexTable-body-row-cell u-cursorPointer u-whiteSpaceNowrap">Content</td>
			<!-- stopPropagation on the table data cell with secondary action -->
			<td class="indexTable-body-row-cell mod-alignRight mod-actions" (click)="$event.stopPropagation()">
				<button luTooltip="Secondary action (you can click)" luTooltipOnlyForDisplay (click)="message('Secondary action')" type="button" class="button mod-delete indexTable-body-row-cell-subAction">
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
				</button>
			</td>
		</tr>
		<!-- (click) with action on table row -->
		<tr class="indexTable-body-row" (click)="message('Primary action')">
			<td class="indexTable-body-row-cell u-cursorPointer">
				<!-- nothing here, the event will be bubbling -->
				<!-- u-widthFitContent to contain de width and center the tooltip -->
				<button luTooltip="Primary action (you can click)" type="button" class="indexTable-body-row-cell-link u-widthFitContent u-ellipsis">Tooltip for the row <code class="code">button</code></button>
			</td>
			<td class="indexTable-body-row-cell u-cursorPointer"><div class="u-ellipsis" luTooltip luTooltipWhenEllipsis>Tooltip when ellipsis</div></td>
			<!-- stopPropagation on the table data cell with a mod-allowTextSelection -->
			<td class="indexTable-body-row-cell u-whiteSpaceNowrap mod-allowTextSelection" (click)="$event.stopPropagation()">Selectable</td>
			<!-- u-widthFitContent to contain de width and center the tooltip -->
			<td class="indexTable-body-row-cell u-cursorPointer">
				<div class="u-ellipsis u-widthFitContent pr-u-focusVisible u-borderRadiusM" luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">Tooltip</div>
			</td>
			<td class="indexTable-body-row-cell u-cursorPointer u-whiteSpaceNowrap">Content</td>
			<!-- stopPropagation to prevent bubbling -->
			<td class="indexTable-body-row-cell mod-alignRight mod-actions" (click)="$event.stopPropagation()">
				<button luTooltip="Secondary action (you can click)" luTooltipOnlyForDisplay (click)="message('Secondary action')" type="button" class="button mod-delete indexTable-body-row-cell-subAction">
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
