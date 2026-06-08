import { IconComponent } from '@lucca-front/ng/icon';
import { PLGPushComponent } from '@lucca-front/ng/plg-push';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory, generateInputs } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

export default {
	title: 'Documentation/Feedback/PLG Push/Angular/Basic',
	component: PLGPushComponent,
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
	render: (args, context) => {
		const { description, linkLabel, linkURL, removed, ...inputs } = args;
		return {
			template: `<lu-plg-push ${generateInputs(inputs, context.argTypes)}${removed ? ' removed="true"' : ' '}>
	Bénéficiez de toutes les options liées au télétravail avec Timmi Office.
	<a class="link mod-icon" href="#" target="_blank" rel="noopener noreferrer">
		<span class="link-text">Demander un essai gratuit</span><!-- no text node here --><span class="link-icon"><lu-icon class="pr-u-displayContents" icon="arrowExternal" alt="Ouvrir dans une nouvelle fenêtre" /></span>
	</a>
</lu-plg-push>`,
		};
	},
	argTypes: {
		heading: {
			type: 'string',
			description: 'Ajoute un titre au composant.',
		},
		removable: {
			control: {
				type: 'boolean',
			},
			description: 'Rend le composant supprimable.',
		},
	},
} as Meta;

export const Template: StoryObj<PLGPushComponent> = {
	args: {
		heading: ``,
	},
};

export const TemplateTEST = createTestStory({ ...Template, args: { ...Template.args, removable: true } }, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu du composant', async () => {
		const plgPush = canvasElement.querySelector('lu-plg-push');
		await expect(plgPush).toBeInTheDocument();
		await expect(canvas.getByText(/Bénéficiez de toutes les options/)).toBeVisible();
	});

	await step('Vérifie le bouton de fermeture (removable)', async () => {
		const closeButton = canvas.getByRole('button');
		await expect(closeButton).toBeVisible();
	});

	await step('Interaction souris - fermeture du composant', async () => {
		const closeButton = canvas.getByRole('button');
		await userEvent.click(closeButton);
		await waitForAngular();
		await expect(canvasElement.querySelector('.plgPush')).not.toBeInTheDocument();
	});
});
