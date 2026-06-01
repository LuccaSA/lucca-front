import { provideRouter } from '@angular/router';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective, HorizontalNavigationTabComponent } from '@lucca-front/ng/horizontal-navigation';
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
		currentIndex: {
			control: {
				min: 0,
				max: 3,
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [HorizontalNavigationComponent, HorizontalNavigationLinkDirective, HorizontalNavigationTabComponent],
		}),
		applicationConfig({
			providers: [provideRouter([])],
		}),
	],
	render: (args, { argTypes }) => {
		const { numericBadge, disabled, currentIndex, ...otherArgs } = args;
		const disabledParam = disabled ? ` disabled` : ``;
		const currentIndexParam = currentIndex !== 0 ? ` [currentIndex]="${currentIndex}"` : ``;

		return {
			template: `<lu-horizontal-navigation${currentIndexParam}${generateInputs(otherArgs, argTypes)}>
	<lu-horizontal-navigation-tab label="Tab 1">Content 1</lu-horizontal-navigation-tab>
	<lu-horizontal-navigation-tab label="Tab 2">Content 2</lu-horizontal-navigation-tab>
	<lu-horizontal-navigation-tab label="Tab 3">Content 3</lu-horizontal-navigation-tab>
	<lu-horizontal-navigation-tab label="Tab 4"${disabledParam}>Content 4</lu-horizontal-navigation-tab>
</lu-horizontal-navigation>
`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		noBorder: false,
		container: false,
		size: null,
		disabled: false,
		currentIndex: 0,
	},
};
