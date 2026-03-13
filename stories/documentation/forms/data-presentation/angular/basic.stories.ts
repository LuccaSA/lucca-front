import { DataPresentationComponent } from '@lucca-front/ng/form-field';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Forms/Data Presentation/Angular/Basic',
	component: DataPresentationComponent,
	render: (args, context) => {
		return {
			template: `<lu-data-presentation label="label">Value</lu-data-presentation>`,
		};
	},
} as Meta;

export const Template: StoryObj<DataPresentationComponent> = {
	argTypes: {},

	args: {},
};
