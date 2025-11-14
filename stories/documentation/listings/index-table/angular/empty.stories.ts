import { bob } from '@/stories/users/user.mocks';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import {
	IndexTableActionComponent,
	IndexTableBodyComponent,
	IndexTableComponent,
	IndexTableFootComponent,
	IndexTableHeadComponent,
	IndexTableRowCellComponent,
	IndexTableRowCellHeaderComponent,
	IndexTableRowComponent,
} from '@lucca-front/ng/index-table';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';

interface BasicStory {}

export default {
	title: 'Documentation/Listings/Index Table/Angular/Empty',
	argTypes: {
		bob: HiddenArgType,
	},
	decorators: [
		moduleMetadata({
			imports: [
				IndexTableComponent,
				IndexTableBodyComponent,
				IndexTableRowComponent,
				IndexTableRowCellComponent,
				IndexTableRowCellHeaderComponent,
				IndexTableHeadComponent,
				IndexTableFootComponent,
				IndexTableActionComponent,
				IndexTableBodyComponent,
				ButtonComponent,
				EmptyStateSectionComponent,
				HttpClientModule,
			],
		}),
	],
} as Meta;

function getTemplate(args: BasicStory): string {
	return `<lu-index-table empty>
	<thead luIndexTableHead>
		<tr luIndexTableRow>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell align="end">Label</th>
		</tr>
	</thead>
	<tbody luIndexTableBody>
		<tr luIndexTableRow>
			<th luIndexTableCell colspan="3">
				<lu-empty-state-section
					hx="3"
					icon="https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconSearch.svg"
					heading="Empty State"
					description="Flatus obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos potest vile diversitate flatus."
				/>
			</th>
		</tr>
	</tbody>
</lu-index-table>
`;
}

const Template: StoryFn<BasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { bob };
