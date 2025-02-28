import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { HighlightDataComponent } from '@lucca-front/ng/highlight-data';
import { LinkComponent } from '@lucca-front/ng/link';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';
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
		bubble: {
			options: [1, 2, 3, 4, null],
			control: {
				type: 'select',
			},
		},
		illustration: {
			options: ['calculator', 'calendar', 'cleemy-card', 'coffee', 'headphone', 'mail', 'manifying-glass', 'medallon', 'piggy-bank', 'polaroid-female', 'polaroid-male', 'polaroids', null],
			control: {
				type: 'select',
			},
		},
		infos: {
			type: 'boolean',
		},
		size: {
			options: [null, 'S'],
			control: {
				type: 'select',
			},
		},
		theme: {
			options: [null, 'light', 'dark'],
			control: {
				type: 'select',
			},
		},
		palette: {
			options: ['lucca', 'cleemy', 'timmi', 'poplee', 'coreHR', 'pagga', 'cc'],
			control: {
				type: 'select',
			},
		},
		action: {
			options: [null, 'button', 'link'],
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
		infos: false,
		size: null,
		theme: null,
		palette: null,
		action: null,
	},
};
