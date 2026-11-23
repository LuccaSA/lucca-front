import { ListboxComponent, OptionComponent } from '@lucca-front/ng/listbox';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { cleanupTemplate } from '@/helpers/stories';

interface OptionCheckboxStory {
	checked: boolean;
}

export default {
	title: 'Documentation/Forms/Listbox Option/Angular/Checkbox',
	decorators: [
		moduleMetadata({
			imports: [ListboxComponent, OptionComponent],
		}),
	],
	argTypes: {
		checkbox: {
			control: false,
			description: 'Affiche une checkbox dans l’option, même hors d’une listbox multiple.',
			table: { category: 'inputs (listbox-option)', defaultValue: { summary: 'false' } },
		},
		checked: {
			description: 'Sélectionne l’option.',
			table: { category: 'inputs (listbox-option)', defaultValue: { summary: 'false' } },
		},
	},
	render: (args: OptionCheckboxStory) => {
		const checked = args.checked ? ` checked` : ``;
		return {
			template: cleanupTemplate(`<lu-listbox>
	<lu-listbox-option checkbox${checked}>Inclure les collaborateurs partis</lu-listbox-option>
	<lu-listbox-option>option 1</lu-listbox-option>
	<lu-listbox-option>option 2</lu-listbox-option>
</lu-listbox>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		checked: false,
	},
};
