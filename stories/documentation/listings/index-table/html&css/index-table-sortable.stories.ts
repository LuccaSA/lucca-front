import { provideAnimations } from '@angular/platform-browser/animations';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface IndexTableSortableStory {
	align: string;
}

export default {
	title: 'Documentation/Listings/Index Table/HTML&CSS/Sortable',
	argTypes: {
		align: {
			options: ['', 'mod-alignRight', 'mod-alignCenter'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [LuTooltipTriggerDirective],
		}),
		applicationConfig({
			providers: [provideAnimations()],
		}),
	],
} as Meta;

function getTemplate(args: IndexTableSortableStory): string {
	return `<table class="indexTable mod-layoutFixed">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell ${args.align}" scope="col">Not sortable</th>
			<th class="indexTable-head-row-cell ${args.align}" scope="col">
				<button type="button" class="tableSortable button mod-ellipsis" #sortBtn1>
					<span class="tableSortable-label" luTooltip luTooltipWhenEllipsis [luTooltipTriggerAnchor]="sortBtn1">Sortable</span>
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell ${args.align}" scope="col" aria-sort="ascending">
				<button type="button" class="tableSortable button mod-ellipsis" #sortBtn2>
					<span class="tableSortable-label" luTooltip luTooltipWhenEllipsis [luTooltipTriggerAnchor]="sortBtn2">Sorted ascending</span>
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell ${args.align}" scope="col" aria-sort="descending">
				<button type="button" class="tableSortable button mod-ellipsis" #sortBtn3>
					<span class="tableSortable-label" luTooltip luTooltipWhenEllipsis [luTooltipTriggerAnchor]="sortBtn3">Sorted descending</span>
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell ${args.align}" scope="col" aria-sort="none">
				<button type="button" class="tableSortable button mod-ellipsis" onclick="switch (this.parentNode.getAttribute('aria-sort')) { case 'ascending': this.parentNode.setAttribute('aria-sort', 'descending'); break; case 'descending': this.parentNode.setAttribute('aria-sort', 'none'); break; default: this.parentNode.setAttribute('aria-sort', 'ascending'); }" #sortBtn4>
					<span class="tableSortable-label" luTooltip luTooltipWhenEllipsis [luTooltipTriggerAnchor]="sortBtn4">Interactive</span>
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell ${args.align}">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell ${args.align}">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
		</tr>
	</tbody>
</table>`;
}

const Template = (args: IndexTableSortableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Sortable: StoryObj<IndexTableSortableStory> = {
	args: {
		align: '',
	},
	render: Template,
};
