import { IconComponent } from '@lucca-front/ng/icon';
import { MobilePushComponent } from '@lucca-front/ng/mobile-push';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory, generateInputs } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, within } from 'storybook/test';

export default {
	title: 'Documentation/Feedback/Mobile Push/Angular/Basic',
	component: MobilePushComponent,
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
	render: (args: MobilePushComponent & { description: string }, context) => {
		const { description, ...inputs } = args;
		return {
			template: `<lu-mobile-push ${generateInputs(inputs, context.argTypes)}>
	Posez une absence depuis n’importe où avec l’application Lucca.
</lu-mobile-push>`,
		};
	},
	argTypes: {
		appStoreLinkClicked: {
			control: {
				type: null,
			},
			description: 'Clic sur le bouton App Store.',
		},
		googlePlayLinkClicked: {
			control: {
				type: null,
			},
			description: 'Clic sur le bouton Google Play.',
		},
	},
} as Meta;

export const Template: StoryObj<MobilePushComponent & { description: string }> = {
	args: {},
};

export const TemplateTEST = createTestStory(Template, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu du composant', async () => {
		const mobilePush = canvasElement.querySelector('lu-mobile-push');
		await expect(mobilePush).toBeInTheDocument();
		await expect(canvas.getByText(/Posez une absence depuis n'importe où/)).toBeVisible();
	});

	await step('Vérifie les liens App Store et Google Play', async () => {
		const links = canvas.getAllByRole('link');
		await expect(links).toHaveLength(2);
		const appStoreImg = canvas.getByRole('img', { name: /App Store/i });
		await expect(appStoreImg).toBeVisible();
		const googlePlayImg = canvas.getByRole('img', { name: /Google Play/i });
		await expect(googlePlayImg).toBeVisible();
	});
});
