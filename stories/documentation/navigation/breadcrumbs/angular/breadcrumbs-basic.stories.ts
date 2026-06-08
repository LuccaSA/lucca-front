import { BreadcrumbsComponent, BreadcrumbsLinkDirective } from '@lucca-front/ng/breadcrumbs';
import { Meta, moduleMetadata } from '@storybook/angular';
import { createTestStory, generateInputs } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

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

	await step('Navigation clavier entre les liens', async () => {
		const links = canvas.getAllByRole('link');
		links[0].focus();
		await expect(links[0]).toHaveFocus();
		await userEvent.tab();
		await waitForAngular();
		await expect(links[1]).toHaveFocus();
	});
});
