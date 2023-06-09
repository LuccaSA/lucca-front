import { Meta, Story } from '@storybook/angular';

interface TableBasicStory {
	clickable: boolean;
	zebra: boolean;
	alignTop: boolean;
	horizontalAlign: string;
	s: boolean;
	borderless: boolean;
	noOffset: boolean;
	parentChild: boolean;
	collapsable: boolean;
}

export default {
	title: 'Documentation/Listings/Table/Basic',
	argTypes: {
		clickable: {
			control: {
				type: 'boolean',
			},
		},
		zebra: {
			control: {
				type: 'boolean',
			},
		},
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Small',
		},
		alignTop: {
			control: {
				type: 'boolean',
			},
			description: 'Aligne le contenu des cellules vers le haut.',
		},
		horizontalAlign: {
			options: ['', 'mod-alignCenter', 'mod-alignRight'],
			control: {
				type: 'select',
			},
			description: "Change l'alignement horizontal d'une cellule",
		},
		borderless: {
			control: {
				type: 'boolean',
			},
		},
		noOffset: {
			control: {
				type: 'boolean',
			},
		},
		parentChild: {
			control: {
				type: 'boolean',
			},
			description: 'Hiérarchise les lignes avec une logique parents/enfants',
		},
		collapsable: {
			control: {
				type: 'boolean',
			},
			description: "Associé à <code>.mod-parent</code> permet de rendre un parent repliable. <code>.is-collapsed</code> permet de changer d'état.",
		},
	},
} as Meta;

function getTemplate(args: TableBasicStory): string {
	const clickable = args.clickable ? `mod-clickable` : '';
	const zebra = args.zebra ? `mod-zebra` : '';
	const alignTop = args.alignTop ? `mod-alignTop` : '';
	const horizontalAlign = args.horizontalAlign;
	const s = args.s ? `mod-S` : '';
	const borderless = args.borderless ? `mod-borderless` : '';
	const noOffset = args.noOffset ? `mod-noOffset` : '';
	const parent = args.parentChild ? `mod-parent` : '';
	const child = args.parentChild ? `mod-child` : '';
	const collapsable = args.collapsable ? `mod-collapsable` : '';
	return `
	<table class="table ${clickable} ${zebra} ${alignTop} ${s} ${borderless} ${noOffset}">
		<thead class="table-head">
			<tr class="table-head-row">
				<th class="table-head-row-cell">Label</th>
				<th class="table-head-row-cell">Label</th>
				<th class="table-head-row-cell ${horizontalAlign}">Label</th>
			</tr>
		</thead>
		<tbody class="table-body">
			<tr class="table-body-row ${parent} ${collapsable}">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu<br />Contenu</td>
				<td class="table-body-row-cell ${horizontalAlign}">Contenu</td>
			</tr>
			<tr class="table-body-row ${child}">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu<br />Contenu</td>
				<td class="table-body-row-cell ${horizontalAlign}">Contenu</td>
			</tr>
			<tr class="table-body-row ${child}">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu<br />Contenu</td>
				<td class="table-body-row-cell ${horizontalAlign}">Contenu</td>
			</tr>
		</tbody>
		<tfoot class="table-foot">
			<tr class="table-foot-row ${child}">
				<td class="table-foot-row-cell">Footer</td>
				<td class="table-foot-row-cell">Footer</td>
				<td class="table-foot-row-cell ${horizontalAlign}">Footer</td>
			</tr>
		</tfoot>
	</table>
	`;
}

const Template: Story<TableBasicStory> = (args: TableBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { clickable: false, zebra: false, alignTop: false, horizontalAlign: '', s: false, borderless: false, noOffset: false, parentChild: false, collapsable: false };
