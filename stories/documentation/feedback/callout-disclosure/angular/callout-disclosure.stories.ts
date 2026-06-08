import { ButtonComponent } from '@lucca-front/ng/button';
import { CALLOUT_SIZE, CalloutDisclosureComponent, CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective, CalloutFeedbackListComponent, CalloutStates } from '@lucca-front/ng/callout';
import { PALETTE } from '@lucca/prisme/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory, generateInputs, setStoryOptions } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

export default {
	title: 'Documentation/Feedback/Callout Disclosure/Angular',
	component: CalloutDisclosureComponent,
	decorators: [
		moduleMetadata({
			imports: [CalloutFeedbackItemComponent, CalloutFeedbackListComponent, CalloutFeedbackItemDescriptionDirective, ButtonComponent],
		}),
	],
	render: (args, { argTypes }) => {
		const { palette, ...inputs } = args;
		const paletteArg = palette !== 'none' && palette !== undefined ? ` palette="${palette}"` : ``;

		return {
			template: `<lu-callout-disclosure ${paletteArg}${generateInputs(args, argTypes)}>
		<ul lu-callout-feedback-list palette="neutral">
			<li lu-callout-feedback-item>
				<lu-feedback-item-description>
					 Feedback description.
				</lu-feedback-item-description>
				<button lu-feedback-item-action luButton="outlined">Click me !</button>
				<button lu-feedback-item-action luButton="ghost">Click me but inverted !</button>
			</li>
			<li lu-callout-feedback-item>
				<lu-feedback-item-description>
					 Feedback description #2.
				</lu-feedback-item-description>
				<button lu-feedback-item-action luButton>Click me !</button>
			</li>
		</ul>
	</lu-callout-disclosure>`,
		};
	},
	argTypes: {
		icon: {
			options: ['', 'signInfo', 'signSuccess', 'signWarning', 'signError', 'signHelp'],
			control: {
				type: 'select',
			},
			description: 'Ajoute une icône au callout.',
		},
		state: {
			options: setStoryOptions(CalloutStates),
			control: {
				type: 'select',
			},
			description: 'État du callout.',
		},
		size: {
			options: setStoryOptions(CALLOUT_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du callout.',
		},
		heading: {
			description: 'Titre du callout. [PortalContent]',
		},
		palette: {
			options: setStoryOptions(PALETTE),
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au callout.',
		},
		open: {
			description: 'Place le callout dans son état déplié.',
		},
	},
} as Meta;

export const Template: StoryObj<CalloutDisclosureComponent> = {
	args: {
		heading: 'List title',
		palette: 'none',
		open: false,
	},
};

export const TemplateTEST = createTestStory(Template, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial (fermé)', async () => {
		const summary = canvas.getByRole('button');
		await expect(summary).toBeVisible();
		const details = canvasElement.querySelector('details');
		await expect(details).not.toHaveAttribute('open');
	});

	await step('Interaction souris - ouverture', async () => {
		const summary = canvas.getByRole('button');
		await userEvent.click(summary);
		await waitForAngular();
		const details = canvasElement.querySelector('details');
		await expect(details).toHaveAttribute('open');
	});

	await step('Interaction souris - fermeture', async () => {
		const summary = canvas.getByRole('button');
		await userEvent.click(summary);
		await waitForAngular();
		const details = canvasElement.querySelector('details');
		await expect(details).not.toHaveAttribute('open');
	});

	await step('Interaction clavier - ouverture avec Entrée', async () => {
		const summary = canvas.getByRole('button');
		summary.focus();
		await expect(summary).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		const details = canvasElement.querySelector('details');
		await expect(details).toHaveAttribute('open');
	});

	await step('Interaction clavier - fermeture avec Entrée', async () => {
		const summary = canvas.getByRole('button');
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		const details = canvasElement.querySelector('details');
		await expect(details).not.toHaveAttribute('open');
	});
});
