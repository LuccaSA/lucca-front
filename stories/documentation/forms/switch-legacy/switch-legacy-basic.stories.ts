import { Meta, StoryFn } from '@storybook/angular';

interface SwitchLegacyBasicStory {
	disabled: boolean;
	inline: boolean;
	s: boolean;
}

export default {
	title: 'Documentation/Forms/Switch Legacy/Basic',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Small',
		},
		inline: {
			control: {
				type: 'boolean',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: SwitchLegacyBasicStory): string {
	const disabled = args.disabled ? ` disabled` : '';
	const s = args.s ? ` mod-S` : '';
	const inline = args.inline ? ` mod-inline` : '';
	return `<label class="switch${s}${inline}">
	<input class="switch-input" type="checkbox" name="switchList1"${disabled}>
	<span class="switch-label">Label</span>
</label>
<label class="switch${s}${inline}">
	<input class="switch-input" type="checkbox" name="switchList1"${disabled} checked>
	<span class="switch-label">Label</span>
</label>`;
}

const Template: StoryFn<SwitchLegacyBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { inline: false, disabled: false, s: false };
