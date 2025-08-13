import { ListboxComponent, OptionComponent } from '@lucca-front/ng/listbox';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
	state: string;
	withOption: boolean;
}

export default {
	title: 'Documentation/Forms/Option/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [ListboxComponent, OptionComponent],
		}),
	],
	argTypes: {
		state: {
			control: 'select',
			options: [null, 'loading', 'empty'],
		},
		withOption: {
			type: 'boolean',
			if: { arg: 'state', truthy: true },
		},
	},
	render: (args: OptionBasicStory) => {
		const multiple = args.multiple ? ` multiple` : ``;
		const status = args.state !== null ? ` state="${args.state}"` : ``;
		const statusMsg = args.state === 'loading' ? ` statusMsg="Chargement…"` : args.state === 'empty' ? ` statusMsg="Aucun résultat pour votre recherche"` : ``;
		if (args.withOption || args.state === null) {
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
		state: null,
		withOption: false,
	},
};
