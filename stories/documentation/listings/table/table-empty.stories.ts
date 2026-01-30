import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface TableBasicStory {
	withOverflow: boolean;
	navSide: boolean;
	navSideCompact: boolean;
}

export default {
	title: 'Documentation/Listings/Table/Empty',
	decorators: [
		moduleMetadata({
			imports: [EmptyStateSectionComponent, ButtonComponent],
		}),
	],
	argTypes: {
		navSideCompact: {
			if: { arg: 'navSide', truthy: true },
		},
	},
} as Meta;

function getTemplate(args: TableBasicStory): string {
	const style = args.withOverflow ? ` style="width: 200vw"` : '';
	const compact = args.navSideCompact ? ` mod-compact` : '';
	const navsideTpl = args.navSide
		? `<div class="navSide mod-withBanner${compact}"></div>
		`
		: ``;

	return `
		${navsideTpl}<div class="main-content">
			<table class="table" role="presentation"${style}>
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
							<lu-empty-state-section hx="3" illustration="rocket" heading="Empty state section" description="Description can be a string or a ng-template Description can be a string or a ng-template Description can be a string or a ng-template">
								<button luButton type="button" palette="product">Button</button>
							</lu-empty-state-section>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	`;
}

const Template = (args: TableBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			margin: -1rem;
			display: block;
		}
		`,
	],
});

export const Basic: StoryObj<TableBasicStory> = {
	args: {
		withOverflow: false,
		navSide: true,
		navSideCompact: false,
	},
	render: Template,
};
