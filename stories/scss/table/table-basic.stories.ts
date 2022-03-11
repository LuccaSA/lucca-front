import { Meta, Story } from '@storybook/angular';

interface TableBasicStory {
	clickable: boolean;
	zebra: boolean;
	alignTop: boolean;
	alignRight: boolean;
	small: boolean;
	borderless: boolean;
}

export default {
	title: 'SCSS/Table/Basic',
	argTypes: {
		clickable: {
			control: {
				type: 'boolean',
			}
		},
		zebra: {
			control: {
				type: 'boolean',
			}
		},
		small: {
			control: {
				type: 'boolean',
			}
		},
		alignTop: {
			control: {
				type: 'boolean',
			},
			description: 'Aligne le contenu des cellules vers le haut.',
		},
		alignRight: {
			control: {
				type: 'boolean',
			},
			description: 'Aligne le contenu des cellules à droite.',
		},
		borderless: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: TableBasicStory): string {
	const clickable = args.clickable ? `mod-clickable` : '';
	const zebra = args.zebra ? `mod-zebra` : '';
	const alignTop = args.alignTop ? `mod-alignTop` : '';
	const alignRight = args.alignRight ? `mod-alignRight` : '';
	const small = args.small ? `mod-small` : '';
	const borderless = args.borderless ? `mod-borderless` : '';
	return `
	<table class="table ${clickable} ${zebra} ${alignTop} ${small} ${borderless}">
		<thead class="table-head">
			<tr class="table-head-row">
				<th class="table-head-row-cell">Label</th>
				<th class="table-head-row-cell">Label</th>
				<th class="table-head-row-cell ${alignRight}">Label</th>
			</tr>
		</thead>
		<tbody class="table-body">
			<tr class="table-body-row">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell ${alignRight}">Contenu</td>
			</tr>
			<tr class="table-body-row">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell ${alignRight}">Contenu</td>
			</tr>
			<tr class="table-body-row">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell ${alignRight}">Contenu</td>
			</tr>
		</tbody>
	</table>
	`
}

const Template: Story<TableBasicStory> = (args: TableBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {clickable: false, zebra: false, alignTop: false, alignRight: false, small: false, borderless: false};
