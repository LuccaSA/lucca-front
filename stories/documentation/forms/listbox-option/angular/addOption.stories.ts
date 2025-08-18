import { IconComponent } from '@lucca-front/ng/icon';
import { ListboxComponent, OptionComponent } from '@lucca-front/ng/listbox';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
}

export default {
	title: 'Documentation/Forms/Listbox Option/Angular/Add option',
	decorators: [
		moduleMetadata({
			imports: [ListboxComponent, OptionComponent, IconComponent],
		}),
	],
	argTypes: {},
	render: (args: OptionBasicStory) => {
		const multiple = args.multiple ? ` multiple` : ``;
		return {
			styles: [`lu-listbox { block-size: 15rem }`],
			template: cleanupTemplate(`<lu-listbox${multiple}>
	<lu-listbox-option>option 1</lu-listbox-option>
	<lu-listbox-option>option 2</lu-listbox-option>
	<lu-listbox-option>option 3</lu-listbox-option>
	<lu-listbox-option>option 4</lu-listbox-option>
	<lu-listbox-option>option 5</lu-listbox-option>
	<lu-listbox-option>option 6</lu-listbox-option>
	<lu-listbox-option>option 7</lu-listbox-option>
	<lu-listbox-option>option 8</lu-listbox-option>
	<lu-listbox-option>option 9</lu-listbox-option>
	<lu-listbox-option add>Ajouter une option</lu-listbox-option>
</lu-listbox>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		multiple: false,
	},
};
