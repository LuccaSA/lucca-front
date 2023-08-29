import { Meta, Story } from '@storybook/angular';

interface InlineMessageBasicStory {
	s: boolean;
}

export default {
	title: 'Documentation/Texts/InlineMessage/HTML & CSS/Basic',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Small',
		},
	},
} as Meta;

function getTemplate(args: InlineMessageBasicStory): string {
	const s = args.s ? ` mod-S` : '';
	return `<div class="inlineMessage${s}">Inline message</div>`;
}

const Template: Story<InlineMessageBasicStory> = (args: InlineMessageBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { s: false };
