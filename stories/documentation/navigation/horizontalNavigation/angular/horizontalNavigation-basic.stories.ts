import { provideRouter } from '@angular/router';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Navigation/HorizontalNavigation/Angular',
	argTypes: {
		size: {
			options: [null, 'S'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [HorizontalNavigationComponent, HorizontalNavigationLinkDirective, NumericBadgeComponent],
		}),
		applicationConfig({
			providers: [provideRouter([])],
		}),
	],
	render: (args, { argTypes }) => {
		const { numericBadge, ...otherArgs } = args;
		const numericBadgeElement = numericBadge ? ` <lu-numeric-badge [value]="888" />` : ``;

		return {
			template: `<lu-horizontal-navigation${generateInputs(otherArgs, argTypes)}>
	<a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action" routerLink="/" ariaCurrentWhenActive="page">Page 1${numericBadgeElement}</a>
	<a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action" href="#2" aria-current="page">Page 2${numericBadgeElement}</a>
	<a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action is-disabled">Page 3${numericBadgeElement}</a>
</lu-horizontal-navigation>`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		noBorder: false,
		container: false,
		size: null,
		numericBadge: false,
	},
};
