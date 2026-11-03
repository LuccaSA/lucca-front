import { provideHttpClient } from '@angular/common/http';
import { ORNAMENT_BUBBLE, ORNAMENT_ILLUSTRATION, OrnamentComponent } from '@lucca-front/ng/ornament';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, generateInputs, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Structure/Ornament/Angular/Basic',
	argTypes: {
		bubble: {
			options: setStoryOptions(ORNAMENT_BUBBLE),
			control: { type: 'select' },
			description: 'Bulle décorative affichée derrière l’illustration.',
			table: { category: 'inputs' },
		},
		illustration: {
			options: setStoryOptions(ORNAMENT_ILLUSTRATION),
			control: { type: 'select' },
			description: 'Illustration affichée devant la bulle. Il est également possible de renseigner une URL.',
			table: { category: 'inputs' },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [OrnamentComponent],
		}),
		applicationConfig({
			providers: [provideHttpClient()],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			template: cleanupTemplate(`<lu-ornament ${generateInputs(args, argTypes)} />`),
		};
	},
} as Meta;

export const Basic: StoryObj<OrnamentComponent> = {
	args: {
		bubble: 1,
		illustration: 'piggy-bank',
	},
};
