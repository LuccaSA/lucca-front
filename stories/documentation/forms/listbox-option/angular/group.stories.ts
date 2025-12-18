import { IconComponent } from '@lucca-front/ng/icon';
import { ListboxComponent, OptionComponent } from '@lucca-front/ng/listbox';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
}

export default {
	title: 'Documentation/Forms/Listbox Option/Angular/Group',
	decorators: [
		moduleMetadata({
			imports: [ListboxComponent, OptionComponent, IconComponent],
		}),
	],
	argTypes: {
		multiple: {
			description: "Ajoute une checkbox à l'option.",
		},
	},
	render: (args: OptionBasicStory) => {
		const multiple = args.multiple ? ` multiple` : ``;
		const select = args.multiple ? ` selectAll="Tout sélectionner"` : ``;
		return {
			styles: [`lu-listbox { block-size: 15rem }`],
			template: cleanupTemplate(`<lu-listbox${multiple}>
	<lu-listbox-option group${select}>
		Group 1
		<ng-container optgroup>
			<lu-listbox-option>option 1.1</lu-listbox-option>
			<lu-listbox-option>option 1.2</lu-listbox-option>
			<lu-listbox-option>option 1.3</lu-listbox-option>
			<lu-listbox-option>option 1.4</lu-listbox-option>
		</ng-container>
	</lu-listbox-option>
	<lu-listbox-option group${select}>
		Group 2
		<ng-container optgroup>
			<lu-listbox-option>option 2.1</lu-listbox-option>
			<lu-listbox-option>option 2.2</lu-listbox-option>
			<lu-listbox-option>option 2.3</lu-listbox-option>
			<lu-listbox-option>option 2.4</lu-listbox-option>
		</ng-container>
	</lu-listbox-option>
	<lu-listbox-option group>
		Group 3
		<ng-container optgroup>
			<lu-listbox-option>option 3.1</lu-listbox-option>
			<lu-listbox-option>option 3.2</lu-listbox-option>
			<lu-listbox-option>option 3.3</lu-listbox-option>
			<lu-listbox-option>option 3.4</lu-listbox-option>
		</ng-container>
	</lu-listbox-option>
</lu-listbox>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		multiple: false,
	},
};
