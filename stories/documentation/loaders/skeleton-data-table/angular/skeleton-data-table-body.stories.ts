import { SkeletonDataTableComponent } from '@lucca-front/ng/skeleton';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

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
				<th class="dataTable-head-row-cell">Ipsum</th>
				<th class="dataTable-head-row-cell">Dolor</th>
			</tr>
		</thead>
		<lu-skeleton-data-table dataTableBodyOnly [cols]="3" [rows]="8" />
	</table>
</div>`;
}

const Template: StoryFn<SkeletonDataTableStory> = (args) => ({
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

export const DataTableBodyOnly = Template.bind({});
DataTableBodyOnly.args = {};
