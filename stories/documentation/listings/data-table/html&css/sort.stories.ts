import { provideAnimations } from '@angular/platform-browser/animations';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface SortStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Sort',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [LuTooltipTriggerDirective],
		}),
		applicationConfig({
			providers: [provideAnimations()],
		}),
	],
} as Meta;

function getTemplate(args: SortStory): string {
	return `<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">
					<button type="button" class="tableSortable button mod-ellipsis" #sortBtn1>
						<span class="tableSortable-label" luTooltip luTooltipWhenEllipsis [luTooltipTriggerAnchor]="sortBtn1">Label</span>
						<span class="tableSortable-arrows">
							<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
							<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
						</span>
					</button>
				</th>
				<th class="dataTable-head-row-cell" aria-sort="ascending">
					<button type="button" class="tableSortable button mod-ellipsis" #sortBtn2>
						<span class="tableSortable-label" luTooltip luTooltipWhenEllipsis [luTooltipTriggerAnchor]="sortBtn2">Label</span>
						<span class="tableSortable-arrows">
							<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
							<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
						</span>
					</button>
				</th>
				<th class="dataTable-head-row-cell" aria-sort="descending">
					<button type="button" class="tableSortable button mod-ellipsis" #sortBtn3>
						<span class="tableSortable-label" luTooltip luTooltipWhenEllipsis [luTooltipTriggerAnchor]="sortBtn3">Label</span>
						<span class="tableSortable-arrows">
							<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
							<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
						</span>
					</button>
				</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
	</table>
</div>`;
}

const Template = (args: SortStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Sort: StoryObj<SortStory> = {
	args: {},
	render: Template,
};
