import { IconComponent } from '@lucca-front/ng/icon';
import { ListboxComponent, OptionComponent, Treeitem } from '@lucca-front/ng/listbox';
import { Meta, moduleMetadata } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Forms/Listbox Option/Angular/Collapsable tree',
	decorators: [
		moduleMetadata({
			imports: [ListboxComponent, OptionComponent, IconComponent, Treeitem],
		}),
	],
	argTypes: {
		multiple: {
			description: 'Ajoute une checkbox à l’option, à côté du chevron.',
			table: { category: 'inputs' },
		},
		expanded: {
			description: 'Déplie les enfants. Bidirectionnel : le chevron le bascule aussi.',
			table: { category: 'models' },
		},
	},
	render: (args) => {
		const multiple = args['multiple'] ? ` multiple` : ``;
		const expanded = args['expanded'] ? ` [expanded]="true"` : ``;
		return {
			template: `<lu-listbox tree collapsable${multiple}>
	<lu-listbox-option>Lucca Software Iberia</lu-listbox-option>
	<lu-listbox-option collapsable${expanded}>
		Lucca SAS
		<ng-container treeitem>
			<lu-listbox-option>Lucca Brest</lu-listbox-option>
			<lu-listbox-option>Lucca Marseille</lu-listbox-option>
			<lu-listbox-option collapsable${expanded}>
				Lucca Nantes
				<ng-container treeitem>
					<lu-listbox-option>Lucca Nantes Sud</lu-listbox-option>
				</ng-container>
			</lu-listbox-option>
		</ng-container>
	</lu-listbox-option>
</lu-listbox>`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		multiple: true,
		expanded: false,
	},
};
