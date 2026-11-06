import { DataPresentationComponent, DataPresentationListComponent } from '@lucca-front/ng/form-field';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Forms/Data Presentation/Angular/List',
	component: DataPresentationListComponent,
	decorators: [
		moduleMetadata({
			imports: [DataPresentationComponent],
		}),
	],
	argTypes: {
		size: {
			options: [null, 'S'],
			control: { type: 'select' },
			description: 'Taille de la liste, héritée par ses items.',
			table: { category: 'inputs' },
		},
	},
	render: (args) => {
		const sizeAttr = args['size'] ? ` size="${args['size']}"` : '';

		return {
			template: `<lu-data-presentation-list${sizeAttr}>
	<div luDataPresentation label="Label A">Value A</div>
	<div luDataPresentation label="Label B">Value B</div>
	<div luDataPresentation label="Label C" noValue></div>
</lu-data-presentation-list>`,
		};
	},
} as Meta;

export const Template: StoryObj<DataPresentationListComponent> = {
	args: {
		size: null,
	},
};
