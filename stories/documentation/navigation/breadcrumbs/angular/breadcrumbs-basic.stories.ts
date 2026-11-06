import { provideRouter, RouterLink } from '@angular/router';
import { BreadcrumbsComponent, BreadcrumbsLinkDirective, luBreadcrumbsTranslations } from '@lucca-front/ng/breadcrumbs';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular-vite';
import { generateInputs, intlArgType } from '@/helpers/stories';

export default {
	title: 'Documentation/Navigation/Breadcrumbs/Angular/Basic',
	argTypes: {
		disableCompact: {
			description: 'Désactive l’affichage compact, appliqué automatiquement lorsque le fil d’Ariane contient 2 liens ou moins.',
			table: { category: 'inputs' },
		},
		intl: intlArgType(luBreadcrumbsTranslations, 'LuBreadcrumbsLabel'),
	},
	decorators: [
		moduleMetadata({
			imports: [BreadcrumbsComponent, BreadcrumbsLinkDirective, RouterLink],
		}),
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
	render: (args, { argTypes }) => {
		const { ...otherArgs } = args;

		return {
			template: `<lu-breadcrumbs ${generateInputs(otherArgs, argTypes)}>
	<a *luBreadcrumbsLink routerLink="/">You</a>
	<a *luBreadcrumbsLink href="#2">are</a>
	<a *luBreadcrumbsLink aria-current="page">here</a>
</lu-breadcrumbs>`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		disableCompact: false,
	},
};
