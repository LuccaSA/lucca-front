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
		selected: {
			control: {
				type: 'range',
				min: 1,
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
		const { numericBadge, disabled, selected, ...otherArgs } = args;
		const disabledParam = disabled ? ` disabled` : ``;
		const selectedParam = selected !== 1 ? ` [selected]="${selected}"` : ``;

		return {
			template: `<lu-horizontal-navigation${selectedParam} tablist${generateInputs(otherArgs, argTypes)}>
	<lu-horizontal-navigation-tab label="Tab 1">Contenu 1</lu-horizontal-navigation-tab>
	<lu-horizontal-navigation-tab label="Tab 2">Contenu 2</lu-horizontal-navigation-tab>
	<lu-horizontal-navigation-tab label="Tab 3">Contenu 3</lu-horizontal-navigation-tab>
	<lu-horizontal-navigation-tab label="Tab 4"${disabledParam}>Contenu 4</lu-horizontal-navigation-tab>
</lu-horizontal-navigation>

<div id="panel-1" aria-labelledby="tab-1" role="tabpanel" tabindex="0" class="horizontalNavigation_panel is-active">
	<p>Contenu 1</p>
</div>

<div id="panel-2" aria-labelledby="tab-2" role="tabpanel" tabindex="0" class="horizontalNavigation_panel">
	<p>Contenu 2</p>
</div>

<div id="panel-3" aria-labelledby="tab-3" role="tabpanel" tabindex="0" class="horizontalNavigation_panel">
	<p>Contenu 3</p>
</div>

<div id="panel-4" aria-labelledby="tab-4" role="tabpanel" tabindex="0" class="horizontalNavigation_panel">
	<p>Contenu 4</p>
</div>
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
		selected: 1,
	},
};
