import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
import { Meta, moduleMetadata } from '@storybook/angular';
import { createTestStory } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

interface VerticalNavigationStories {
	heading: string;
}

export default {
	title: 'Documentation/Navigation/VerticalNavigation/Angular/Basic',
	argTypes: {
		heading: {
			control: {
				type: 'text',
			},
			description: 'Titre de la section. [PortalContent]',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [VerticalNavigationComponent, VerticalNavigationLinkComponent, VerticalNavigationItemComponent, VerticalNavigationGroupComponent],
		}),
	],
	render: (args: VerticalNavigationStories) => {
		const heading = ` heading="${args.heading ? args.heading : ''}"`;
		return {
			template: `<lu-vertical-navigation${heading}>
	<lu-vertical-navigation-group label="Group 1" icon="heart">
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 1</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#" aria-current="page">Item 2</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 3</a>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>
 	<lu-vertical-navigation-item>
		<a luVerticalNavigationLink href="#" icon="heartFilled">Item 4</a>
	</lu-vertical-navigation-item>
</lu-vertical-navigation>`,
		};
	},
} as Meta;
export const Basic = {
	args: {
		heading: 'Section',
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const nav = canvas.getByRole('navigation');
		await expect(nav).toBeVisible();
	});

	await step('Vérifie les liens de navigation', async () => {
		const links = canvas.getAllByRole('link');
		await expect(links.length).toBeGreaterThan(0);
	});

	await step('Clic sur un lien', async () => {
		const links = canvas.getAllByRole('link');
		await userEvent.click(links[0]);
		await waitForAngular();
	});

	await step('Navigation clavier entre les éléments', async () => {
		const links = canvas.getAllByRole('link');
		links[0].focus();
		await expect(links[0]).toHaveFocus();
		await userEvent.tab();
		await waitForAngular();
		await expect(links[1]).toHaveFocus();
	});
});
