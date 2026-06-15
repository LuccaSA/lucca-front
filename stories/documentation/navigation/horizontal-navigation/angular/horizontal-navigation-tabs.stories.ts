import { provideRouter } from '@angular/router';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective, HorizontalNavigationTabComponent } from '@lucca-front/ng/horizontal-navigation';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { createTestStory, generateInputs } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

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
			description: "[Story] Définit l'index de l'onglet sélectionné.",
			control: {
				min: 0,
				max: 3,
			},
		},
		disabled: {
			description: 'Désactive un onglet.',
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

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const tablist = canvas.getByRole('tablist');
		await expect(tablist).toBeVisible();
		const tabs = canvas.getAllByRole('tab');
		await expect(tabs.length).toBe(4);
	});

	await step('Clic sur un onglet', async () => {
		const tabs = canvas.getAllByRole('tab');
		await userEvent.click(tabs[1]);
		await waitForAngular();
		await expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
	});

	await step('Navigation clavier entre les onglets', async () => {
		const tabs = canvas.getAllByRole('tab');
		tabs[0].focus();
		await expect(tabs[0]).toHaveFocus();
		await userEvent.keyboard('{ArrowRight}');
		await waitForAngular();
	});
});
