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
				<lu-software-icon *luSoftwareIconWrapperItem icon="faces" iconAlt="Faces" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="ask-lucca" iconAlt="Ask Lucca" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="office" iconAlt="Office" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="sandbox" iconAlt="Sandbox" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="absences" iconAlt="Absences" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="business-expenses" iconAlt="Expenses" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="mood" iconAlt="Mood" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="invoices" iconAlt="Invoices" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="engagement" iconAlt="Engagement" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="timesheet" iconAlt="Timesheet" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="compensation" iconAlt="Compensation" />
				<lu-software-icon *luSoftwareIconWrapperItem icon="store" iconAlt="Store" />
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
