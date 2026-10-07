import { SoftwareIconComponent } from '@lucca-front/ng/software-icon';
import { luSoftwareIconWrapperTranslations, SoftwareIconWrapperComponent, SoftwareIconWrapperItemDirective } from '@lucca-front/ng/software-icon-wrapper';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { intlArgType } from '@/helpers/stories';

export default {
	title: 'Documentation/Structure/Software icon/Angular/Wrapper',
	argTypes: {
		size: {
			options: ['XS', 'S', ''],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs' },
		},
		max: {
			control: {
				type: 'range',
				min: 0,
				max: 12,
			},
			description: 'Nombre maximum d’icônes à afficher. Les icônes supplémentaires sont cachées. `0` affiche toutes les icônes.',
			table: { category: 'inputs', defaultValue: { summary: '0' } },
		},
		intl: intlArgType(luSoftwareIconWrapperTranslations, 'SoftwareIconWrapperTranslations'),
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
				<lu-software-icon *SoftwareIconWrapperItem icon="faces" iconAlt="Faces" />
				<lu-software-icon *SoftwareIconWrapperItem icon="ask-lucca" iconAlt="Ask Lucca" />
				<lu-software-icon *SoftwareIconWrapperItem icon="office" iconAlt="Office" />
				<lu-software-icon *SoftwareIconWrapperItem icon="sandbox" iconAlt="Sandbox" />
				<lu-software-icon *SoftwareIconWrapperItem icon="absences" iconAlt="Absences" />
				<lu-software-icon *SoftwareIconWrapperItem icon="business-expenses" iconAlt="Expenses" />
				<lu-software-icon *SoftwareIconWrapperItem icon="mood" iconAlt="Mood" />
				<lu-software-icon *SoftwareIconWrapperItem icon="invoices" iconAlt="Invoices" />
				<lu-software-icon *SoftwareIconWrapperItem icon="engagement" iconAlt="Engagement" />
				<lu-software-icon *SoftwareIconWrapperItem icon="timesheet" iconAlt="Timesheet" />
				<lu-software-icon *SoftwareIconWrapperItem icon="compensation" iconAlt="Compensation" />
				<lu-software-icon *SoftwareIconWrapperItem icon="store" iconAlt="Store" />
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
