import { IconComponent } from '@lucca-front/ng/icon';
import { ListboxComponent, OptionComponent, Treeitem } from '@lucca-front/ng/listbox';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
	deepNesting: boolean;
}

export default {
	title: 'Documentation/Forms/Option/Angular/Tree',
	decorators: [
		moduleMetadata({
			imports: [ListboxComponent, OptionComponent, IconComponent, Treeitem],
		}),
	],
	argTypes: {},
	render: (args: OptionBasicStory) => {
		const multiple = args.multiple ? ` multiple` : ``;
		return {
			template: cleanupTemplate(`<lu-listbox tree${multiple}>
	<lu-listbox-option>option 1</lu-listbox-option>
	<lu-listbox-option>
		option 2
		<ng-container treeitem>
			<lu-listbox-option>option 2.1</lu-listbox-option>
			<lu-listbox-option>
				option 2.2
				<ng-container treeitem>
					<lu-listbox-option>option 2.2.1</lu-listbox-option>
					<lu-listbox-option>
						option 2.2.2
					</lu-listbox-option>
				</ng-container>
			</lu-listbox-option>
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
