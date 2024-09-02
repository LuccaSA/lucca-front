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
		const { description, linkLabel, linkURL, ...inputs } = args;
		return {
			template: `<lu-plg-push ${generateInputs(inputs, context.argTypes)}>
	${description}
	<a class="link mod-icon" href="${linkURL}" target="_blank" rel="noopener noreferrer">
		<span class="link-text">${linkLabel}</span><!-- no text node here --><span class="link-icon"><lu-icon class="u-displayContents" icon="arrowExternal" alt="Ouvrir dans une nouvelle fenêtre"></lu-icon></span>
	</a>
</lu-plg-push>`,
		};
	},
	argTypes: {
		heading: {
			type: 'string',
		},
		description: {
			type: 'string',
		},
		linkLabel: {
			type: 'string',
		},
		linkURL: {
			type: 'string',
		},
	},
} as Meta;

export const Template: StoryObj<PLGPushComponent & { description: string; linkLabel: string; linkURL: string }> = {
	args: {
		heading: ``,
		description: `Bénéficiez de toutes les options liées au télétravail avec Timmi Office.`,
		linkLabel: `Demander un essai gratuit`,
		linkURL: `#`,
	},
};
