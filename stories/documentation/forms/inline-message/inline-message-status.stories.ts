import { Meta, Story } from '@storybook/angular';

interface InlineMessageStatusStory {
	s: boolean;
}

export default {
	title: 'Documentation/Forms/InlineMessage/Status',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Small',
		},
	},
} as Meta;

function getTemplate(args: InlineMessageStatusStory): string {
	const s = args.s ? `mod-S` : '';
	return `<div class="inlineMessage is-success ${s}"><span aria-hidden="true" class="lucca-icon icon-success"></span>Inline message</div>
<div class="inlineMessage is-warning ${s}"><span aria-hidden="true" class="lucca-icon icon-warning"></span>Inline message</div>
<div class="inlineMessage is-error ${s}"><span aria-hidden="true" class="lucca-icon icon-error"></span>Inline message</div>`;
}

const Template: Story<InlineMessageStatusStory> = (args: InlineMessageStatusStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Status = Template.bind({});
Status.args = { s: false };
