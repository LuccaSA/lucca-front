import { Meta, Story } from '@storybook/angular';

interface TableTwoLinesHeaderStory {}

export default {
	title: 'Documentation/Listings/Table/Two Lines Header',
	argTypes: {},
} as Meta;

function getTemplate(args: TableTwoLinesHeaderStory): string {
	return `
	<table class="table">
		<thead class="table-head">
			<tr class="table-head-row mod-twoLines">
				<th class="table-head-row-cell">
					<span class="table-head-row-cell-wrapper">
						Sortable main line
						<span class="table-head-row-cell-secondLine">Second line</span>
					</span>
				</th>
				<th class="table-head-row-cell mod-sortable is-sorted-descending">
					<span class="table-head-row-cell-wrapper">
						Sortable main line
						<span class="table-head-row-cell-secondLine">Second line</span>
					</span>
				</th>
				<th class="table-head-row-cell">Head cell</th>
			</tr>
		</thead>
	</table>
	`;
}

const Template: Story<TableTwoLinesHeaderStory> = (args: TableTwoLinesHeaderStory) => ({
	props: args,
	template: getTemplate(args),
});

export const TwoLinesHeader = Template.bind({});
TwoLinesHeader.args = {};
