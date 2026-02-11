import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface SortableListBasicStories {
	label: string;
	helperMessage: string;
	small: boolean;
	clickable: boolean;
	unclearable: boolean;
}

export default {
	title: 'Documentation/Listings/Sortable List/Angular/Basic',
	argsTyps: {
		label: {
			control: {
				type: 'text',
			},
			description: "Modifie le texte principal d'un élément de liste.",
		},
		helperMessage: {
			control: {
				type: 'text',
			},
			description: "Ajoute un texte secondaire à l'élément de liste.",
		},
		small: {
			control: 'boolean',
			description: 'Modifie la taille du composant.',
		},
		clickable: {
			description: 'Rend les lignes cliquables.',
		},
		unclearable: {
			control: 'boolean',
			description: 'Masque la croix de suppression.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [SortableListComponent, SortableListItemComponent],
		}),
	],
	render: (args: SortableListBasicStories) => {
		const small = args.small ? ` small` : '';
		const clickable = args.clickable ? ` clickable` : '';
		const unclearable = args.unclearable ? ` unclearable` : '';
		const label = ` label="${args.label}"`;
		const helperMessage = args.helperMessage?.length ? ` helperMessage="${args.helperMessage}"` : '';
		return {
			template: cleanupTemplate(`<lu-sortable-list${small}>
  <lu-sortable-list-item${label}${helperMessage}${unclearable}${clickable} />
	<lu-sortable-list-item${label}${helperMessage}${unclearable}${clickable} />
	<lu-sortable-list-item${label}${helperMessage}${unclearable}${clickable} />
</lu-sortable-list>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		label: 'Label',
		helperMessage: 'Helper message',
		small: false,
		clickable: false,
		unclearable: false,
	},
};
