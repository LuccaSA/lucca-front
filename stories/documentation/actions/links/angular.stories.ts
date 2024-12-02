import { provideRouter, RouterLink } from '@angular/router';
import { LinkComponent } from '@lucca-front/ng/link';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Actions/Link/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [LinkComponent, RouterLink],
		}),
		applicationConfig({
			providers: [provideRouter([])],
		}),
	],

	render: (args) => {
		const { label, disabled, external, href, routerLink, ...inputs } = args;
		const disable = disabled ? 'disabled' : '';
		const externe = external ? 'external' : '';

		if (disabled) {
			return {
				template: `lorem <a href="${href}" luLink ${externe} ${disable}>${label}</a> dolor<br />
			lorem <a [routerLink]="null" luLink ${externe} ${disable}>${label}</a> dolor`,
			};
		} else {
			return {
				template: `lorem <a href="${href}" luLink ${externe} ${disable}>${label}</a> dolor<br />
			lorem <a [routerLink]="'${routerLink}'" luLink ${externe} ${disable}>${label}</a> dolor`,
			};
		}
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
		routerLink: {
			type: 'string',
		},
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		label: `ipsum`,
		href: `https://www.example.org`,
		routerLink: './#example',
		disabled: false,
		external: false,
	},
};
