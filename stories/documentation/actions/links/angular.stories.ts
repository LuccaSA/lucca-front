import { LinkComponent } from '@lucca-front/ng/link';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Actions/Link/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [LinkComponent],
		}),
	],

	render: (args) => {
		const { label, disabled, external, href, ...inputs } = args;
		const disable = disabled ? 'disabled' : '';
		const externe = external ? 'external' : '';

		return {
			template: `lorem <a href="${href}" luLink ${externe} ${disable}>${label}</a> dolor`,
		};
	},
	argTypes: {
		disabled: {
			type: 'boolean',
		},
		external: {
			type: 'boolean',
		},
		label: {
			type: 'string',
		},
		href: {
			type: 'string',
		},
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		label: `ipsum`,
		href: `https://example.org/`,
		disabled: false,
		external: false,
	},
};
