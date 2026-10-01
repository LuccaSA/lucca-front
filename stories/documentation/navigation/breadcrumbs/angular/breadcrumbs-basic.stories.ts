import { BreadcrumbsComponent, BreadcrumbsLinkDirective, luBreadcrumbsTranslations } from '@lucca-front/ng/breadcrumbs';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { generateInputs, intlArgType } from '@/helpers/stories';

export default {
	title: 'Documentation/Navigation/Breadcrumbs/Angular/Basic',
	argTypes: {
		intl: intlArgType(luBreadcrumbsTranslations, 'LuBreadcrumbsLabel'),
	},
	decorators: [
		moduleMetadata({
			imports: [BreadcrumbsComponent, BreadcrumbsLinkDirective],
		}),
	],
	render: (args, { argTypes }) => {
		const { ...otherArgs } = args;

		return {
			template: `<lu-breadcrumbs ${generateInputs(otherArgs, argTypes)}>
	<a *luBreadcrumbsLink routerLink="/" ariaCurrentWhenActive="page">You</a>
	<a *luBreadcrumbsLink ariaCurrentWhenActive="page" href="#2">are</a>
	<a *luBreadcrumbsLink aria-current="page">here</a>
</lu-breadcrumbs>`,
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
