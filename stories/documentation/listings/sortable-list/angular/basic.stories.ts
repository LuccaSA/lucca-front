import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { cleanupTemplate } from '@/helpers/stories';

interface SortableListBasicStories {
	label: string;
	helperMessage: string;
	small: boolean;
	clickable: boolean;
	unclearable: boolean;
	delete?: () => void;
}

export default {
	title: 'Documentation/Listings/Sortable List/Angular/Basic',
	argTypes: {
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le texte principal d’un élément de liste. [PortalContent]',
			table: { category: 'inputs (sortable-list-item)' },
		},
		helperMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte secondaire à l’élément de liste.',
			table: { category: 'inputs (sortable-list-item)' },
		},
		small: {
			control: 'boolean',
			description:
				'Modifie la taille de tous les éléments de la liste. L’input `small` de `lu-sortable-list-item` applique la même taille à un seul élément (utile pour l’aperçu d’un élément déplacé en dehors de la liste).',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		clickable: {
			control: 'boolean',
			description: 'Rend les lignes cliquables.',
			table: { category: 'inputs (sortable-list-item)', defaultValue: { summary: 'false' } },
		},
		unclearable: {
			control: 'boolean',
			description: 'Masque la croix de suppression.',
			table: { category: 'inputs (sortable-list-item)', defaultValue: { summary: 'false' } },
		},
		delete: {
			description: 'Événement déclenché au clic sur la croix de suppression.',
			action: 'delete',
			control: false,
			table: { category: 'outputs (sortable-list-item)', type: { summary: 'void' } },
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
		const item = `<lu-sortable-list-item${label}${helperMessage}${unclearable}${clickable} (delete)="delete()" />`;
		return {
			props: { ...args },
			template: cleanupTemplate(`<lu-sortable-list${small}>
	${item}
	${item}
	${item}
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
