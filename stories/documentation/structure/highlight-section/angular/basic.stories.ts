import { generateInputs, setStoryOptions } from '@/helpers/stories';
import { HIGHLIGHT_SECTION_BUBBLE, HIGHLIGHT_SECTION_ILLUSTRATION, HIGHLIGHT_SECTION_PALETTE, HIGHLIGHT_SECTION_THEME, HighlightSectionComponent } from '@lucca-front/ng/highlight-section';
import { Meta, moduleMetadata } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Structure/Highlight section/Angular/Basic',
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
			description: 'Applique une palette de couleurs au composant.',
		},
		bubbleStart: {
			options: setStoryOptions(HIGHLIGHT_SECTION_BUBBLE),
			control: {
				type: 'select',
			},
			description: 'Sans valeur, aucune bulle se sera affichée.',
		},
		bubbleEnd: {
			options: setStoryOptions(HIGHLIGHT_SECTION_BUBBLE),
			control: {
				type: 'select',
			},
			description: 'Sans valeur, aucune bulle se sera affichée.',
		},
		illustration: {
			options: setStoryOptions(HIGHLIGHT_SECTION_ILLUSTRATION),
			control: {
				type: 'select',
			},
			description: 'Il est également possible de renseigner une URL.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [HighlightSectionComponent],
		}),
	],
	render: (args, { argTypes }) => {
		const { theme, ...otherArgs } = args;
		const themeParam = theme !== 'white' && theme !== '' && theme !== undefined ? ` theme="${theme}"` : ``;
		return {
			template: `<lu-highlight-section${themeParam}${generateInputs(otherArgs, argTypes)}>Content</lu-highlight-section>`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		theme: 'light',
		bubbleStart: '',
		bubbleEnd: '',
	},
};
