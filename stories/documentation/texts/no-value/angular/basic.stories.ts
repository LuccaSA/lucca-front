import {
	IndexTableBodyComponent,
	IndexTableComponent,
	IndexTableHeadComponent,
	IndexTableRowCellComponent,
	IndexTableRowCellHeaderComponent,
	IndexTableRowComponent,
} from '@lucca-front/ng/index-table';
import { NoValueComponent } from '@lucca-front/ng/no-value';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface NoValueBasicStory {
	alt?: string;
	tableCell: boolean;
}

export default {
	title: 'Documentation/Texts/NoValue/Angular/Basic',
	component: NoValueComponent,
	argTypes: {
		alt: {
			control: { type: 'text' },
			description:
				'Texte lu par les lecteurs d’écran à la place du tiret. Par défaut, « Non renseigné », et rien quand le tiret est le seul contenu d’une cellule de tableau (le lecteur d’écran l’annonce déjà vide). Une chaîne vide ne lit rien.',
			table: { category: 'inputs', type: { summary: 'string' } },
		},
		tableCell: {
			description: '[Story] Place le composant dans une cellule de tableau.',
			table: { category: 'story' },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [NoValueComponent, IndexTableComponent, IndexTableHeadComponent, IndexTableBodyComponent, IndexTableRowComponent, IndexTableRowCellComponent, IndexTableRowCellHeaderComponent],
		}),
	],
	render: (args: NoValueBasicStory) => {
		const noValue = `<lu-no-value${args.alt !== undefined ? ` alt="${args.alt}"` : ''} />`;

		return {
			template: args.tableCell
				? `<lu-index-table>
	<thead luIndexTableHead>
		<tr luIndexTableRow>
			<th luIndexTableCell>Lorem ipsum</th>
		</tr>
	</thead>
	<tbody luIndexTableBody>
		<tr luIndexTableRow>
			<td luIndexTableCell>${noValue}</td>
		</tr>
	</tbody>
</lu-index-table>`
				: noValue,
		};
	},
} as Meta;

export const Basic: StoryObj<NoValueBasicStory> = {
	args: {
		tableCell: false,
	},
};
