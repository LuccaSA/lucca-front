import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { HIGHLIGHT_DATA_BUBBLE, HIGHLIGHT_DATA_ILLUSTRATION, HIGHLIGHT_DATA_PALETTE, HIGHLIGHT_DATA_SIZE, HIGHLIGHT_DATA_THEME, HighlightDataComponent } from '@lucca-front/ng/highlight-data';
import { LinkComponent } from '@lucca-front/ng/link';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs, setStoryOptions } from 'stories/helpers/stories';
export default {
	title: 'Documentation/Structure/Highlight data/Angular/Basic',
	component: HighlightDataComponent,

	decorators: [
		moduleMetadata({
			imports: [ButtonComponent, LinkComponent],
		}),
		applicationConfig({
			providers: [provideRouter([])],
		}),
	],
	render: (args: HighlightDataComponent & { action: string }, context) => {
		const { action, ...inputs } = args;

		let actionContent = '';
		if (action === 'button') {
			actionContent = '<button luButton="outlined" type="button">Action</button>';
		} else if (action === 'link') {
			actionContent = '<a luLink>Link</a>';
		}

		return {
			template: `<lu-highlight-data ${generateInputs(inputs, context.argTypes)}>${actionContent}</lu-highlight-data>`,
		};
	},
} as Meta;

export const Template: StoryObj<HighlightDataComponent & { action: string }> = {
	argTypes: {
		heading: {
			type: 'string',
		},
		value: {
			type: 'string',
		},
		subText: {
			type: 'string',
		},
		bubble: {
			options: setStoryOptions(HIGHLIGHT_DATA_BUBBLE),
			control: {
				type: 'select',
			},
		},
		illustration: {
			options: setStoryOptions(HIGHLIGHT_DATA_ILLUSTRATION),
			control: {
				type: 'select',
			},
			description: 'Il est également possible de renseigner une URL.',
		},
		valueFirst: {
			type: 'boolean',
		},
		size: {
			options: setStoryOptions(HIGHLIGHT_DATA_SIZE),
			control: {
				type: 'select',
			},
		},
		theme: {
			options: setStoryOptions(HIGHLIGHT_DATA_THEME),
			control: {
				type: 'select',
			},
		},
		palette: {
			options: setStoryOptions(HIGHLIGHT_DATA_PALETTE),
			control: {
				type: 'select',
			},
			description: 'La palette influençant également la couleur du SVG des bubbles et donc l’URL associée, il est nécessaire de renseigner la gamme.',
		},
		action: {
			options: ['', 'button', 'link'],
			control: {
				type: 'select',
			},
		},
	},

	args: {
		heading: 'Title',
		value: 'Content',
		bubble: 1,
		illustration: 'piggy-bank',
		valueFirst: false,
		subText: null,
	},
};
