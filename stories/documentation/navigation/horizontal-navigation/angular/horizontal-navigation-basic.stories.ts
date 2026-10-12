import { provideRouter, RouterLink } from '@angular/router';
import { HORIZONTAL_NAVIGATION_SIZE, HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular-vite';
import { PaletteAllArgType } from '@/helpers/common-arg-types';
import { generateInputs, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Navigation/HorizontalNavigation/Angular/Basic',
	argTypes: {
		size: {
			options: setStoryOptions(HORIZONTAL_NAVIGATION_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs', defaultValue: { summary: 'null' } },
		},
		noBorder: {
			description: 'Retire la bordure sous le composant.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		container: {
			description: 'Applique un container autour des liens pour aligner le composant avec le contenu de la page.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		vertical: {
			description: 'Affiche la navigation verticalement.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		palette: {
			...PaletteAllArgType,
			table: { category: 'inputs', defaultValue: { summary: 'null' } },
		},
		numericBadge: {
			description: '[Story] Présente un exemple avec Numeric Badge.',
			table: { category: 'story' },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [HorizontalNavigationComponent, HorizontalNavigationLinkDirective, NumericBadgeComponent, RouterLink],
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
		vertical: false,
		palette: '',
		numericBadge: false,
	},
};
