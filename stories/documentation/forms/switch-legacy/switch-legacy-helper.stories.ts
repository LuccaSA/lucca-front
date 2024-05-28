import { Meta, StoryFn } from '@storybook/angular';

interface SwitchLegacyHelperStory {
	disabled: boolean;
	inline: boolean;
	s: boolean;
}

export default {
	title: 'Documentation/Forms/Switch Legacy/Helper',
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

function getTemplate(args: SwitchLegacyHelperStory): string {
	const disabled = args.disabled ? ` disabled` : '';
	const s = args.s ? ` mod-S` : '';
	const inline = args.inline ? ` mod-inline` : '';
	return `<label class="switch${s}${inline}">
	<input class="switch-input" type="checkbox" name="switchList1"${disabled}>
	<div class="switch-label">Label <div class="switch-label-helper">Helper text</div></div>
</label>
<label class="switch${s}${inline}">
	<input class="switch-input" type="checkbox" name="switchList1"${disabled} checked>
	<div class="switch-label">Label <div class="switch-label-helper">Helper text</div></div>
</label>`;
}

const Template: StoryFn<SwitchLegacyHelperStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Helper = Template.bind({});
Helper.args = { inline: false, disabled: false, s: false };
