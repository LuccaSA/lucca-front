import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { HIGHLIGHT_DATA_BUBBLE, HIGHLIGHT_DATA_ILLUSTRATION, HIGHLIGHT_DATA_PALETTE, HIGHLIGHT_DATA_SIZE, HIGHLIGHT_DATA_THEME, HighlightDataComponent } from '@lucca-front/ng/highlight-data';
import { LinkComponent } from '@lucca-front/ng/link';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, setStoryOptions } from '@/helpers/stories';
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
			template: actionContent
				? `<lu-highlight-data${generateInputs(inputs, context.argTypes)}>${actionContent}</lu-highlight-data>`
				: `<lu-highlight-data${generateInputs(inputs, context.argTypes)} />`,
		};
	},
} as Meta;

export const Template: StoryObj<HighlightDataComponent & { action: string }> = {
	argTypes: {
		heading: {
			type: 'string',
			description: 'Titre du composant. [PortalContent]',
			table: { category: 'inputs' },
		},
		value: {
			type: 'string',
			description: 'Valeur affichée. [PortalContent]',
			table: { category: 'inputs' },
		},
		subText: {
			type: 'string',
			description: 'Texte secondaire. [PortalContent]',
			table: { category: 'inputs' },
		},
		bubble: {
			options: setStoryOptions(HIGHLIGHT_DATA_BUBBLE),
			control: {
				type: 'select',
			},
			table: { category: 'inputs' },
		},
		illustration: {
			options: setStoryOptions(HIGHLIGHT_DATA_ILLUSTRATION),
			control: {
				type: 'select',
			},
			description: 'Il est également possible de renseigner une URL.',
			table: { category: 'inputs' },
		},
		valueFirst: {
			type: 'boolean',
			table: { category: 'inputs' },
		},
		size: {
			options: setStoryOptions(HIGHLIGHT_DATA_SIZE),
			control: {
				type: 'select',
			},
			table: { category: 'inputs' },
		},
		theme: {
			options: setStoryOptions(HIGHLIGHT_DATA_THEME),
			control: {
				type: 'select',
			},
			table: { category: 'inputs' },
		},
		palette: {
			options: setStoryOptions(HIGHLIGHT_DATA_PALETTE),
			control: {
				type: 'select',
			},
			description: 'La palette influence également la couleur des bubbles.',
			table: { category: 'inputs' },
		},
		action: {
			options: ['', 'button', 'link'],
			control: {
				type: 'select',
			},
			table: { category: 'inputs' },
		},
	},

	args: {
		heading: 'Title',
		value: 'Content',
		bubble: 1,
		illustration: 'piggy-bank',
		valueFirst: false,
		subText: '',
	},
};
