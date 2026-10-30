import { provideRouter } from '@angular/router';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective, HorizontalNavigationTabComponent } from '@lucca-front/ng/horizontal-navigation';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular-vite';
import { PaletteAllArgType } from '@/helpers/common-arg-types';
import { generateInputs, useControlledStoryModel } from '@/helpers/stories';

export default {
	title: 'Documentation/Navigation/HorizontalNavigation/Angular/Tabs',
	argTypes: {
		size: {
			options: [null, 'S'],
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
		currentIndex: {
			description: 'Index de l’onglet sélectionné. Two-way.',
			control: {
				type: 'number',
				min: 0,
				max: 3,
			},
			table: { category: 'models', type: { summary: 'number' }, defaultValue: { summary: '0' } },
		},
		currentIndexChange: {
			description: 'Événement déclenché lorsque l’onglet sélectionné change.',
			action: 'currentIndexChange',
			control: false,
			table: { category: 'outputs', type: { summary: 'number' } },
		},
		label: {
			description: 'Libellé de l’onglet. [PortalContent]',
			control: false,
			table: { category: 'inputs (horizontal-navigation-tab)', type: { summary: 'PortalContent' } },
		},
		disabled: {
			description: 'Désactive un onglet.',
			table: { category: 'inputs (horizontal-navigation-tab)', defaultValue: { summary: 'false' } },
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
		const { label, disabled, currentIndex, currentIndexChange, ...otherArgs } = args;
		const disabledParam = disabled ? ` disabled` : ``;
		const model = useControlledStoryModel<number>(currentIndex);

		return {
			props: {
				model,
				onCurrentIndexChange: (index: number) => currentIndexChange?.(index),
			},
			template: `<lu-horizontal-navigation [(currentIndex)]="model.example" (currentIndexChange)="onCurrentIndexChange($event)"${generateInputs(otherArgs, argTypes)}>
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
		vertical: false,
		palette: '',
		disabled: false,
		currentIndex: 0,
	},
};
