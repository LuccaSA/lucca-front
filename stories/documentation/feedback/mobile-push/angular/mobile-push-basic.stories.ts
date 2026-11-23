import { IconComponent } from '@lucca-front/ng/icon';
import { luMobilePushTranslations, MobilePushComponent } from '@lucca-front/ng/mobile-push';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, intlArgType } from '@/helpers/stories';

export default {
	title: 'Documentation/Feedback/Mobile Push/Angular/Basic',
	component: MobilePushComponent,
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
	render: (args, context) => {
		return {
			props: {
				...args,
			},
			template: `<lu-mobile-push ${generateInputs(args, context.argTypes)} (appStoreLinkClicked)="appStoreLinkClicked($event)" (googlePlayLinkClicked)="googlePlayLinkClicked($event)">
	Posez une absence depuis n’importe où avec l’application Lucca.
</lu-mobile-push>`,
		};
	},
	argTypes: {
		appStoreLinkClicked: {
			control: false,
			description: 'Clic sur le bouton App Store.',
			action: 'appStoreLinkClicked',
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		googlePlayLinkClicked: {
			control: false,
			description: 'Clic sur le bouton Google Play.',
			action: 'googlePlayLinkClicked',
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		intl: intlArgType(luMobilePushTranslations, 'MobilePushTranslate'),
	},
} as Meta;

export const Template: StoryObj<MobilePushComponent> = {
	args: {},
};
