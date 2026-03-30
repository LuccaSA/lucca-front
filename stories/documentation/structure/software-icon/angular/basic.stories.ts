import { SOFTWARE_ICON_SIZE, SoftwareIconComponent, SoftwareIconList } from '@lucca-front/ng/software-icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs, setStoryOptions } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Software icon/Angular/Basic',
	argTypes: {
		icon: {
			options: SoftwareIconList,
			control: {
				type: 'select',
			},
			description: "Modifie l'icône produit.",
		},
		size: {
			options: setStoryOptions(SOFTWARE_ICON_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
		disabled: {
			description: 'Marque le produit comme inactif.',
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
