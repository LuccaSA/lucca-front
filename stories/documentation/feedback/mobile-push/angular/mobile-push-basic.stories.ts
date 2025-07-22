import { IconComponent } from '@lucca-front/ng/icon';
import { MobilePushComponent } from '@lucca-front/ng/mobile-push';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

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
	${description}
</lu-mobile-push>`,
		};
	},
	argTypes: {
		description: {
			type: 'string',
		},
	},
} as Meta;

export const Template: StoryObj<MobilePushComponent & { description: string }> = {
	args: {
		description: `Posez une absence depuis n’importe où avec l’application Lucca.`,
	},
};
