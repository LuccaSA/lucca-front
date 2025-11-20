import { IconComponent } from '@lucca-front/ng/icon';
import { PLGPushComponent } from '@lucca-front/ng/plg-push';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Feedback/PLG Push/Angular/Basic',
	component: PLGPushComponent,
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
	render: (args: PLGPushComponent & { description: string; linkLabel: string; linkURL: string }, context) => {
		const { ...inputs } = args;
		return {
			template: `<lu-plg-push ${generateInputs(inputs, context.argTypes)}>
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
	},
} as Meta;

export const Template: StoryObj<PLGPushComponent> = {
	args: {
		heading: ``,
	},
};
