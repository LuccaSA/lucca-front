import { Meta, Story } from '@storybook/angular';

interface RadiosButtonsBasicStory {
	s: boolean;
	disabled: boolean;
}

export default {
	title: 'Documentation/Forms/Radio Buttons/Basic',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
			description: "Taille : Small",
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: RadiosButtonsBasicStory): string {
	const s = args.s ? `mod-S` : '';
	const disabled = args.disabled ? `disabled` : '';
	return `
	<div class="radioButtons ${s}">
		<label class="radioButtons-item">
			<input type="radio" name="radioButtonsID" class="radioButtons-item-input" ${disabled} checked>
			<span class="radioButtons-item-label">Bouton 1</span>
		</label>
		<label class="radioButtons-item">
			<input type="radio" name="radioButtonsID" class="radioButtons-item-input" ${disabled}>
			<span class="radioButtons-item-label">Bouton 2</span>
		</label>
		<label class="radioButtons-item">
			<input type="radio" name="radioButtonsID" class="radioButtons-item-input" ${disabled}>
			<span class="radioButtons-item-label">Bouton 3</span>
		</label>
	</div>
	`;
}

const Template: Story<RadiosButtonsBasicStory> = (args: RadiosButtonsBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { s: false, disabled: false };
