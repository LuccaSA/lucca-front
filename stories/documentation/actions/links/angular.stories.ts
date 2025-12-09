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
<a luLink="${routerLink}"${externe}${disable}${decoration}>${label}</a>
<br /><br />
<a href="${href}" luLink${externe}${disable}${decoration}>${label}</a>
`,
		};
	},
	argTypes: {
		disabled: {
			description: 'Désactive le lien.',
			type: 'boolean',
		},
		external: {
			description: "Précise que le lien va s'ouvrir dans un nouvel onglet.",
			type: 'boolean',
		},
		label: {
			type: 'string',
			description: '[Story] Modifie le label du lien.',
		},
		href: {
			type: 'string',
			description: "Adresse de la page cible. A n'utiliser qu'en lien externe ou non connu par le routeur.",
		},
		routerLink: {
			type: 'string',
			description: 'Adresse de la page cible.',
		},
		decorationHover: {
			description: 'Souligne le lien seulement au survol.',
		},
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		label: `Text link`,
		routerLink: './#example',
		href: `https://www.example.org`,
		external: false,
		disabled: false,
		decorationHover: false,
	},
};
