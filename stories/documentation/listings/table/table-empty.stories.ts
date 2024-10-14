import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { ButtonComponent } from 'dist/ng/button';

interface TableBasicStory {
	withOverflow: boolean;
}

export default {
	title: 'Documentation/Listings/Table/Empty',
	decorators: [
		moduleMetadata({
			imports: [EmptyStateSectionComponent, ButtonComponent],
		}),
	],
	argTypes: {
		withOverflow: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: TableBasicStory): string {
	const style = args.withOverflow ? `style="width: 200vw"` : '';

	return `
		<div class="navSide mod-withBanner"></div>
		<div class="main-content">
			<table class="table" role="presentation" ${style}>
				<thead class="table-head" inert="inert">
					<tr class="table-head-row">
						<th class="table-head-row-cell">Label</th>
						<th class="table-head-row-cell">Label</th>
						<th class="table-head-row-cell">Label</th>
						<th class="table-head-row-cell">Label</th>
						<th class="table-head-row-cell">Label</th>
						<th class="table-head-row-cell">Label</th>
					</tr>
				</thead>
				<tbody class="table-body">
					<tr class="table-body-row">
						<td colspan="6" class="table-body-row-cell">
							<lu-empty-state-section hx="3" icon="https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconRocket.svg" heading="Empty state section" description="Description can be a string or a ng-template Description can be a string or a ng-template Description can be a string or a ng-template">
								<button luButton type="button" palette="product">Button</button>
							</lu-empty-state-section>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	`;
}

const Template: StoryFn<TableBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			margin: -1rem;
		}
		`,
	],
});

export const Basic = Template.bind({});
Basic.args = {
	withOverflow: false,
};
