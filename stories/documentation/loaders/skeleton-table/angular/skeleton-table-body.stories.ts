import { SkeletonTableComponent } from '@lucca-front/ng/skeleton';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface SkeletonTableStory {}

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Table',
	decorators: [
		moduleMetadata({
			imports: [SkeletonTableComponent],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: SkeletonTableStory): string {
	return `<table class="table skeleton is-loading" inert="inert">
	<thead class="table-head">
		<tr class="table-head-row">
			<th class="table-head-row-cell">Lorem</th>
			<th class="table-head-row-cell">Ipsum</th>
			<th class="table-head-row-cell">Dolor</th>
		</tr>
	</thead>
	<lu-skeleton-table tableBodyOnly [cols]="3" />
</table>
	`;
}

const Template: StoryFn<SkeletonTableStory> = (args) => ({
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

export const TableBodyOnly = Template.bind({});
TableBodyOnly.args = {};
