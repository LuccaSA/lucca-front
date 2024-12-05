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
	return `<table class="table skeleton is-loading" inert="inert">
	<thead class="table-head">
		<tr class="table-head-row">
			<th class="table-head-row-cell">Lorem</th>
			<th class="table-head-row-cell">Ipsum</th>
			<th class="table-head-row-cell">Dolor</th>
		</tr>
	</thead>
	<lu-skeleton-data-table tableBodyOnly [cols]="3" />
</table>
	`;
}

const Template: StoryFn<SkeletonDataTableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		th:first-child {
			width: 15rem;
		}	
	`,
	],
});

export const Body = Template.bind({});
Body.args = {};
