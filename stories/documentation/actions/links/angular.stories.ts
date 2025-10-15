import { AsyncPipe } from '@angular/common';
import { provideRouter, RouterLink } from '@angular/router';
import { LinkComponent } from '@lucca-front/ng/link';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { timer } from 'rxjs';

export default {
	title: 'Documentation/Actions/Link/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [LinkComponent, RouterLink, AsyncPipe],
		}),
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],

	render: (args) => {
		const { label, disabled, external, href, routerLink, decorationHover, ...inputs } = args;
		const disable = disabled ? ' disabled' : '';
		const externe = external ? ' external' : '';
		const decoration = decorationHover ? ' decorationHover' : '';

		return {
			props: {
				tick$: timer(0, 1000),
			},
			template: `
Internal link: <a luLink="${routerLink}"${externe}${disable}${decoration}>${label}</a>
<br>
External link: <a href="${href}" luLink${externe}${disable}${decoration}>${label}</a>
`,
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
			description: "A n'utiliser qu'en lien externe ou non connu par le routeur.",
		},
		routerLink: {
			type: 'string',
		},
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		label: `Text link`,
		href: `https://www.example.org`,
		routerLink: './#example',
		disabled: false,
		external: false,
		decorationHover: false,
	},
};
