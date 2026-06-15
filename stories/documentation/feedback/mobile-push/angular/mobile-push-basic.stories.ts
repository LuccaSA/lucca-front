import { IconComponent } from '@lucca-front/ng/icon';
import { MobilePushComponent } from '@lucca-front/ng/mobile-push';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory, generateInputs } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
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
