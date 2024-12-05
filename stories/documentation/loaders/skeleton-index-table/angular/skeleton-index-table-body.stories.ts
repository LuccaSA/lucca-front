import { SkeletonIndexTableComponent } from '@lucca-front/ng/skeleton';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface SkeletonIndexTableStory {}

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton IndexTable',
	decorators: [
		moduleMetadata({
			imports: [SkeletonIndexTableComponent],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: SkeletonIndexTableStory): string {
	return `<table class="indexTable skeleton is-loading" inert="inert">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell">Lorem</th>
			<th class="indexTable-head-row-cell">Ipsum</th>
			<th class="indexTable-head-row-cell">Dolor</th>
		</tr>
	</thead>
	<lu-skeleton-index-table tableBodyOnly [cols]="3" />
</table>
	`;
}

const Template: StoryFn<SkeletonIndexTableStory> = (args) => ({
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
