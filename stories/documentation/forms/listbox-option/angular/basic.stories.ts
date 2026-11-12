import { LISTBOX_STATE, ListboxComponent, OptionComponent } from '@lucca-front/ng/listbox';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { cleanupTemplate, setStoryOptions } from '@/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
	state: string;
	withOption: boolean;
}

export default {
	title: 'Documentation/Forms/Listbox Option/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [ListboxComponent, OptionComponent],
		}),
	],
	argTypes: {
		multiple: {
			description: 'Ajoute une checkbox à l’option.',
			table: { category: 'inputs' },
		},
		state: {
			control: 'select',
			options: setStoryOptions(LISTBOX_STATE),
			description: "Modifie l'état de l'option.",
			table: { category: 'inputs', defaultValue: { summary: 'null' } },
		},
		statusMsg: {
			name: '↳ statusMsg',
			if: { arg: 'state', truthy: true },
			control: false,
			description: 'Message affiché lorsque la listbox est en cours de chargement ou vide.',
			table: { category: 'inputs', type: { summary: 'string | null' }, defaultValue: { summary: 'null' } },
		},
		withOption: {
			name: '↳ withOption',
			type: 'boolean',
			if: { arg: 'state', truthy: true },
			description: '[Story] Conserve l’affichage des options déjà chargées.',
			table: { category: 'story' },
		},
		tree: {
			control: false,
			description: 'Affiche les options sous forme d’arborescence (voir la story Tree).',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		checked: {
			control: false,
			description: 'Sélectionne l’option.',
			table: { category: 'inputs (listbox-option)', defaultValue: { summary: 'false' } },
		},
		mixed: {
			control: false,
			description: 'Applique un état de sélection mixte à l’option.',
			table: { category: 'inputs (listbox-option)', defaultValue: { summary: 'false' } },
		},
		disabled: {
			control: false,
			description: 'Désactive l’option.',
			table: { category: 'inputs (listbox-option)', defaultValue: { summary: 'false' } },
		},
		hovered: {
			control: false,
			description: 'Applique l’état de survol (focus visuel) à l’option.',
			table: { category: 'inputs (listbox-option)', defaultValue: { summary: 'false' } },
		},
		add: {
			control: false,
			description: 'Présente l’option comme une action d’ajout (voir la story Add option).',
			table: { category: 'inputs (listbox-option)', defaultValue: { summary: 'false' } },
		},
		group: {
			control: false,
			description: 'Présente l’option comme un groupe d’options (voir la story Group).',
			table: { category: 'inputs (listbox-option)', defaultValue: { summary: 'false' } },
		},
		select: {
			control: false,
			description: 'Présente l’option comme une action « Tout sélectionner », sans checkbox.',
			table: { category: 'inputs (listbox-option)', defaultValue: { summary: 'false' } },
		},
		selectAll: {
			control: false,
			description: 'Libellé de l’option « Tout sélectionner » affichée dans un groupe (voir la story Group).',
			table: { category: 'inputs (listbox-option)', type: { summary: 'string | null' } },
		},
		elementId: {
			control: false,
			description: 'Identifiant appliqué à l’option.',
			table: { category: 'inputs (listbox-option)', type: { summary: 'string | null' }, defaultValue: { summary: 'null' } },
		},
	},
	render: (args: OptionBasicStory) => {
		const multiple = args.multiple ? ` multiple` : ``;
		const status = args.state ? ` state="${args.state}"` : ``;
		const statusMsg = args.state === 'loading' ? ` statusMsg="Chargement…"` : args.state === 'empty' ? ` statusMsg="Aucun résultat pour votre recherche"` : ``;
		if (args.withOption || !args.state) {
			return {
				template: cleanupTemplate(`<lu-listbox${multiple}${status}${statusMsg}>
	<lu-listbox-option>option 1</lu-listbox-option>
	<lu-listbox-option hovered>option 2</lu-listbox-option>
	<lu-listbox-option checked>option 3</lu-listbox-option>
	<lu-listbox-option checked hovered>option 4</lu-listbox-option>
	<lu-listbox-option disabled>option 5</lu-listbox-option>
	<lu-listbox-option checked disabled>option 6</lu-listbox-option>
</lu-listbox>`),
			};
		} else {
			return {
				template: cleanupTemplate(`<lu-listbox${multiple}${status}${statusMsg} />`),
			};
		}
	},
} as Meta;

export const Basic = {
	args: {
		multiple: false,
		withOption: false,
	},
};
