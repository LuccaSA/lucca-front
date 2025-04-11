import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface IndexTableActionsTooltipsCellStory {}

export default {
	title: 'Documentation/Listings/Index Table/Actions/Tooltips/Cell',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [LuTooltipModule],
		}),
	],
} as Meta;

function getTemplate(args: IndexTableActionsTooltipsCellStory): string {
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
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell u-cursorPointer" (click)="message('Primary action')">
				<!-- real link with navigation and stopPropagation to prevent double navigation -->
				<!-- preventDefault is only here for demonstration -->
				<a href="#" class="indexTable-body-row-cell-link" (click)=" $event.preventDefault(); $event.stopPropagation(); message('Primary action')"><span class="u-mask">See details</span></a>
				<!-- u-widthFitContent and u-maxWidth100% to contain de width and center the tooltip -->
				<div class="u-ellipsis u-widthFitContent u-maxWidth100% pr-u-focusVisible u-borderRadiusM" luTooltip="Primary action (you can click)">Tooltip for the cell <code class="code">a</code></div>
			</td>
			<td class="indexTable-body-row-cell u-cursorPointer" (click)="message('Primary action')">
				<div class="u-ellipsis" luTooltip luTooltipWhenEllipsis>Tooltip when ellipsis</div>
			</td>
			<td class="indexTable-body-row-cell u-whiteSpaceNowrap mod-allowTextSelection">Selectable</td>
			<td class="indexTable-body-row-cell u-cursorPointer" (click)="message('Primary action')">
				<!-- u-widthFitContent to contain the width and center the tooltip -->
				<div class="u-ellipsis u-widthFitContent pr-u-focusVisible u-borderRadiusM" luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">Tooltip</div>
			</td>
			<td class="indexTable-body-row-cell u-cursorPointer u-whiteSpaceNowrap">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight mod-actions" (click)="$event.stopPropagation()">
				<button luTooltip="Secondary action (you can click)" luTooltipOnlyForDisplay (click)="message('Secondary action')" type="button" class="button mod-delete indexTable-body-row-cell-subAction">
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
				</button>
			</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell u-cursorPointer" (click)="message('Primary action')">
				<!-- nothing here, the event will be bubbling -->
				<button type="button" class="indexTable-body-row-cell-link"><span class="u-mask">See details</span></button>
				<!-- u-widthFitContent and u-maxWidth100% to contain de width and center the tooltip -->
				<div class="u-ellipsis u-widthFitContent u-maxWidth100% pr-u-focusVisible u-borderRadiusM" luTooltip="Primary action (you can click)">Tooltip for the cell <code class="code">button</code></div>
			</td>
			<td class="indexTable-body-row-cell u-cursorPointer" (click)="message('Primary action')">
				<div class="u-ellipsis" luTooltip luTooltipWhenEllipsis>Tooltip when ellipsis</div>
			</td>
			<td class="indexTable-body-row-cell u-whiteSpaceNowrap mod-allowTextSelection">Selectable</td>
			<td class="indexTable-body-row-cell u-cursorPointer" (click)="message('Primary action')">
				<!-- u-widthFitContent to contain the width and center the tooltip -->
				<div class="u-ellipsis u-widthFitContent pr-u-focusVisible u-borderRadiusM" luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">Tooltip</div>
			</td>
			<td class="indexTable-body-row-cell u-cursorPointer u-whiteSpaceNowrap">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight mod-actions">
				<button luTooltip="Secondary action (you can click)" luTooltipOnlyForDisplay (click)="message('Secondary action')" type="button" class="button mod-delete indexTable-body-row-cell-subAction">
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
				</button>
			</td>
		</tr>
	</tbody>
</table>
`;
}

const Template: StoryFn<IndexTableActionsTooltipsCellStory> = (args) => ({
	props: {
		...args,
		message: (msg) => {
			alert(msg);
		},
	},
	template: getTemplate(args),
});

export const TooltipsCell = Template.bind({});
