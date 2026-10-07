import { provideRouter } from '@angular/router';
import { LinkComponent, luLinkTranslations } from '@lucca-front/ng/link';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { intlArgType } from '@/helpers/stories';

export default {
	title: 'Documentation/Actions/Link/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [LinkComponent],
		}),
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],

	render: (args) => {
		const { label, disabled, href, luLink, decorationHover } = args;
		const disable = disabled ? ' disabled' : '';
		const decoration = decorationHover ? ' decorationHover' : '';

		return {
			template: `Routing : <a luLink="${luLink}"${disable}${decoration}>${label}</a><br />
Routing (nouvelle fenêtre) : <a luLink="${luLink}" external${disable}${decoration}>${label}</a><br />
Routing (nouvelle fenêtre) uniquement au survol/focus/touch : <a luLink="${luLink}" external hiddenIcon${disable}${decoration}>${label}</a><br />
<br />
Lien : <a href="${href}" luLink${disable}${decoration}>${label}</a><br />
Lien (nouvelle fenêtre) : <a href="${href}" luLink external${disable}${decoration}>${label}</a><br />
Lien (nouvelle fenêtre) uniquement au survol/focus/touch : <a href="${href}" luLink external hiddenIcon${disable}${decoration}>${label}</a><br />`,
		};
	},
	argTypes: {
		disabled: {
			description: 'Désactive le lien.',
			type: 'boolean',
			table: { category: 'inputs' },
		},
		label: {
			type: 'string',
			description: '[Story] Modifie le label du lien.',
			table: { category: 'inputs' },
		},
		href: {
			type: 'string',
			description: 'Adresse de la page cible. À n’utiliser qu’en lien externe ou non connu par le routeur.',
			table: { category: 'inputs' },
		},
		luLink: {
			control: 'text',
			description: 'Adresse de la page cible (commandes du routeur).',
			table: { category: 'inputs', type: { summary: "RouterLink['routerLink'] | null" }, defaultValue: { summary: 'null' } },
		},
		external: {
			control: false,
			description: 'Ouvre le lien dans un nouvel onglet et affiche une icône.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		hiddenIcon: {
			control: false,
			description: 'N’affiche l’icône de lien externe qu’au survol, focus ou touch.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		decorationHover: {
			description: 'Souligne le lien seulement au survol.',
			table: { category: 'inputs' },
		},
		intl: intlArgType(luLinkTranslations, 'LinkTranslate'),
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		label: `Text link`,
		luLink: './#example',
		href: `https://www.example.org`,
		disabled: false,
		decorationHover: false,
	},
};
