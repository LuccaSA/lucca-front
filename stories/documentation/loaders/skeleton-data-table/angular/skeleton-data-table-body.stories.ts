import { SkeletonDataTableComponent } from '@lucca-front/ng/skeleton';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface SkeletonDataTableStory {}

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton DataTable',
	decorators: [
		moduleMetadata({
			imports: [SkeletonDataTableComponent],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: SkeletonDataTableStory): string {
	return `<div class="dataTableWrapper">
	<table class="dataTable skeleton is-loading" inert="inert">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Lorem</th>
				<th class="dataTable-head-row-cell mod-alignCenter">Ipsum</th>
				<th class="dataTable-head-row-cell mod-alignEnd">Dolor</th>
			</tr>
		</thead>
		<lu-skeleton-data-table dataTableBodyOnly [cols]="3" [rows]="8" [colsAlign]="{ '1': 'center', '2': 'end' }" />
	</table>
</div>`;
}

const Template = (args: SkeletonDataTableStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		th:first-child {
			inline-size: 15rem;
		}
	`,
	],
});

export const DataTableBodyOnly: StoryObj<SkeletonDataTableStory> = {
	args: {},
	render: Template,
};
