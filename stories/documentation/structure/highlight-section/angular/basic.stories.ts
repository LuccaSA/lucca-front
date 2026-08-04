import { generateInputs, setStoryOptions } from '@/helpers/stories';
import { provideRouter } from '@angular/router';
import {
	HIGHLIGHT_SECTION_BUBBLE,
	HIGHLIGHT_SECTION_BUBBLE_POSITION,
	HIGHLIGHT_SECTION_ILLUSTRATION,
	HIGHLIGHT_SECTION_PALETTE,
	HIGHLIGHT_SECTION_THEME,
	HighlightSectionComponent,
} from '@lucca-front/ng/highlight-section';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Structure/Highlight section/Angular/Basic',
	component: HighlightSectionComponent,

	decorators: [
		moduleMetadata({
			imports: [],
		}),
		applicationConfig({
			providers: [provideRouter([])],
		}),
	],
	render: (args: HighlightSectionComponent & { action: string }, context) => {
		const { action, ...inputs } = args;

		return {
			template: `<lu-highlight-section ${generateInputs(inputs, context.argTypes)}>Content</lu-highlight-section>`,
		};
	},
} as Meta;

export const Template: StoryObj<HighlightSectionComponent & { action: string }> = {
	argTypes: {
		theme: {
			options: setStoryOptions(HIGHLIGHT_SECTION_THEME),
			control: {
				type: 'select',
			},
		},
		palette: {
			options: setStoryOptions(HIGHLIGHT_SECTION_PALETTE),
			control: {
				type: 'select',
			},
			description: 'La palette influence également la couleur du SVG des bulles et donc l’URL associée, il est nécessaire de renseigner la gamme.',
		},
		bubble: {
			options: setStoryOptions(HIGHLIGHT_SECTION_BUBBLE),
			control: {
				type: 'select',
			},
			description: 'Sans valeur, aucun ornement n’est affiché.',
		},
		bubblePosition: {
			options: setStoryOptions(HIGHLIGHT_SECTION_BUBBLE_POSITION),
			control: {
				type: 'select',
			},
		},
		illustration: {
			options: setStoryOptions(HIGHLIGHT_SECTION_ILLUSTRATION),
			control: {
				type: 'select',
			},
			description: 'Il est également possible de renseigner une URL.',
		},
	},

	args: {
		theme: 'light',
		bubble: 1,
		bubblePosition: 'both',
		action: 'button',
	},
};
