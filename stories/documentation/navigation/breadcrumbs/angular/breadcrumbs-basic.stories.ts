import { BreadcrumbsComponent } from '@lucca-front/ng/breadcrumbs';
import { Meta, moduleMetadata } from '@storybook/angular';
import { BreadcrumbsLinkDirective } from 'packages/ng/breadcrumbs/breadcrumbs-link.directive';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Navigation/Breadcrumbs/Angular/Basic',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [BreadcrumbsComponent, BreadcrumbsLinkDirective],
		}),
	],
	render: (args, { argTypes }) => {
		const { ...otherArgs } = args;

		return {
			template: `<lu-breadcrumbs ${generateInputs(otherArgs, argTypes)}>
	<a *luBreadcrumbsLink class="breadcrumbs-list-item-action" routerLink="/" ariaCurrentWhenActive="page">You</a>
	<a *luBreadcrumbsLink class="breadcrumbs-list-item-action" ariaCurrentWhenActive="page" href="#2">are</a>
	<a *luBreadcrumbsLink class="breadcrumbs-list-item-action" aria-current="page">here</a>
</lu-breadcrumbs>
<lu-breadcrumbs ${generateInputs(otherArgs, argTypes)}>
	<a *luBreadcrumbsLink class="breadcrumbs-list-item-action" ariaCurrentWhenActive="page" href="#2">Compact</a>
	<a *luBreadcrumbsLink class="breadcrumbs-list-item-action" aria-current="page">mode</a>
</lu-breadcrumbs>`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		disableCompact: false,
	},
};
