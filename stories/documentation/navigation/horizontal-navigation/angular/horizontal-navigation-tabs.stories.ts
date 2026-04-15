import { provideRouter } from '@angular/router';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective, HorizontalNavigationTabComponent } from '@lucca-front/ng/horizontal-navigation';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Navigation/HorizontalNavigation/Angular/Tabs',
	argTypes: {
		size: {
			options: [null, 'S'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
		noBorder: {
			description: 'Retire la bordure sous le composant.',
		},
		container: {
			description: 'Applique un container autour des liens pour aligner le composant avec le contenu de la page.',
		},
		numericBadge: {
			description: 'Présente un exemple avec Numeric Badge.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [HorizontalNavigationComponent, HorizontalNavigationLinkDirective, NumericBadgeComponent, HorizontalNavigationTabComponent],
		}),
		applicationConfig({
			providers: [provideRouter([])],
		}),
	],
	render: (args, { argTypes }) => {
		const { numericBadge, ...otherArgs } = args;
		const numericBadgeElement = numericBadge ? ` <lu-numeric-badge [value]="888" />` : ``;

		return {
			template: `<lu-horizontal-navigation tablist${generateInputs(otherArgs, argTypes)}>
	<button type="button" luHorizontalNavigationTab>Tab 1${numericBadgeElement}</button>
	<button type="button" luHorizontalNavigationTab>Tab 2${numericBadgeElement}</button>
	<button type="button" luHorizontalNavigationTab>Tab 3${numericBadgeElement}</button>
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
