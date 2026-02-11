import { SoftwareIconComponent, SoftwareIconList } from '@lucca-front/ng/software-icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Software icon/Angular/Basic',
	argTypes: {
		icon: {
			options: SoftwareIconList,
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['XXS', 'XS', 'S', '', 'L'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [SoftwareIconComponent],
		}),
	],
	render: ({ disabled, size, ...args }, { argTypes }) => {
		const disabledArg = disabled ? ` disabled` : ``;
		const sizeArg = size !== '' ? ` size="${size}"` : ``;
		return {
			template: cleanupTemplate(`<lu-software-icon${sizeArg}${disabledArg}${generateInputs(args, argTypes)} />`),
		};
	},
} as Meta;

export const Basic: StoryObj<SoftwareIconComponent> = {
	args: {
		icon: 'absences',
		disabled: false,
		size: '',
	},
};
