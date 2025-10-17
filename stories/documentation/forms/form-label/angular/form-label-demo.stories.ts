import { LabelComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Forms/Form Label Demo/Angular',

	decorators: [
		moduleMetadata({
			imports: [LabelComponent],
		}),
	],

	render: (args: LabelComponent & { label: string; idArg: string; forArg: string }, context) => {
		const { tag, label, infos, counterMax, idArg, forArg, ...inputs } = args;
		const counterMaxAttr = counterMax ? ` counterMax="${counterMax}"` : ``;
		const tagAttr = tag ? ` tag="${tag}"` : ``;
		const infosAttr = infos ? ` infos="${infos}"` : ``;
		const idAttr = idArg ? ` id="${idArg}"` : ``;
		const forAttr = forArg ? ` for="${forArg}"` : ``;

		return {
			template: `<label${idAttr}${forAttr} lu-label${generateInputs(inputs, context.argTypes)}${infosAttr}${tagAttr}${counterMaxAttr}>${args.label}</label>`,
		};
	},
} as Meta;

export const Template: StoryObj = {
	argTypes: {
		size: {
			options: [null, 'S', 'XS'],
			control: {
				type: 'select',
			},
		},
		count: {
			if: { arg: 'counterMax', truthy: true },
		},
		counterAlt: {
			if: { arg: 'counterMax', truthy: true },
		},
		counterId: {
			if: { arg: 'counterMax', truthy: true },
		},
		fullSize: {
			if: { arg: 'counterMax', truthy: false },
		},
		infosIconAlt: {
			if: { arg: 'infos', truthy: true },
		},
	},

	args: {
		idArg: '',
		forArg: 'idInput',
		critical: false,
		size: null,
		label: 'Lorem ipsum dolor',
		required: false,
		infos: '',
		infosIconAlt: 'Plus d’informations',
		tag: '',
		counterMax: 0,
		count: 8,
		counterAlt: `Votre message fait #count# caractères de long. #counterMax# maximum sont autorisés.`,
		counterId: 'idCounter',
		fullSize: false,
		disabled: false,
	},
};
