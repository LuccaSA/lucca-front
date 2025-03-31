import { provideRouter } from '@angular/router';
import { HighlightSectionComponent } from '@lucca-front/ng/highlight-section';
import { LinkComponent } from '@lucca-front/ng/link';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';
export default {
	title: 'Documentation/Structure/Highlight section/Angular/Basic',
	component: HighlightSectionComponent,

	decorators: [
		moduleMetadata({
			imports: [LinkComponent],
		}),
		applicationConfig({
			providers: [provideRouter([])],
		}),
	],
	render: (args: HighlightSectionComponent, context) => {
		const { ...inputs } = args;

		return {
			template: `
				<lu-highlight-section ${generateInputs(inputs, context.argTypes)}>
					<div class="textFlow">
						<h2>Title</h2>
						<p>First paragraph. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
						<p>Second paragraph shows a <a luLink>Link</a>.</p>
					</div>
				</lu-highlight-section>`,
		};
	},
} as Meta;

export const Template: StoryObj<HighlightSectionComponent> = {
	argTypes: {
		bubbleTop: {
			options: [1, 2, 3, 4, null],
			control: {
				type: 'select',
			},
		},
		bubbleBottom: {
			options: [1, 2, 3, 4, null],
			control: {
				type: 'select',
			},
		},
		size: {
			options: [null, 'S', 'XS'],
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
			options: ['lucca', 'cleemy', 'timmi', 'poplee', 'coreHR', 'pagga', 'cc', 'success', 'warning', 'critical'],
			control: {
				type: 'select',
			},
		},
	},

	args: {
		bubbleTop: 1,
		bubbleBottom: 1,
		size: null,
		theme: null,
		palette: null,
	},
};
