import { SOFTWARE_ICON_BY_MODULE_ID, SoftwareIconComponent, SoftwareIconModuleId } from '@lucca-front/ng/software-icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface ModuleIdStory {
	moduleId: SoftwareIconModuleId;
}

export default {
	title: 'Documentation/Structure/Software icon/Angular/Module id',
	argTypes: {
		moduleId: {
			options: Object.keys(SOFTWARE_ICON_BY_MODULE_ID),
			control: {
				type: 'select',
			},
			description: 'L’input `icon` accepte aussi l’identifiant technique d’une application Lucca, converti en icône produit.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [SoftwareIconComponent],
		}),
	],
	render: (args) => ({
		props: args,
		template: `<lu-software-icon [icon]="moduleId" [iconAlt]="moduleId" />`,
	}),
} as Meta<ModuleIdStory>;

export const ModuleId: StoryObj<ModuleIdStory> = {
	args: {
		moduleId: 'timmi-absences',
	},
};
