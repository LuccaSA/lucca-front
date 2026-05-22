import { SoftwareIconComponent } from '@lucca-front/ng/software-icon';
import { SoftwareIconWrapperComponent, SoftwareIconWrapperItemDirective } from '@lucca-front/ng/software-icon-wrapper';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Structure/Software icon/Angular/Wrapper',
	argTypes: {
		size: {
			options: ['XS', 'S', ''],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
		max: {
			control: {
				type: 'range',
				min: 0,
				max: 12,
			},
			description: 'Nombre maximum d’icônes à afficher. Les icônes supplémentaires sont cachées.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [SoftwareIconComponent, SoftwareIconWrapperComponent, SoftwareIconWrapperItemDirective, LuTooltipTriggerDirective],
		}),
	],
	render: ({ max, size, ...args }, { argTypes }) => {
		const maxArg = max ? ` max="${max}"` : ``;
		const sizeArg = size ? ` size="${size}"` : ``;
		return {
			template: `<lu-software-icon-wrapper${maxArg}${sizeArg}>
				<lu-software-icon *luSoftwareIconWrapperItem icon="analytics" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="ask-lucca" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="office" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="sandbox" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="absences" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="analytics" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="mood" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="client-center" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="cloud-control" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="engagement" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="timesheet" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="compensation" />
			</lu-software-icon-wrapper>`,
		};
	},
} as Meta;

export const Basic: StoryObj<SoftwareIconWrapperComponent> = {
	args: {
		max: 8,
		size: '',
	},
};
