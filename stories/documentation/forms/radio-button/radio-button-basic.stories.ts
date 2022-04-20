import { Meta, Story } from '@storybook/angular';

interface RadiosButtonsBasicStory {
	small: boolean;
	disabled: boolean;
}

export default {
	title: 'Documentation/Forms/Radio Buttons/Basic',
	argTypes: {
		small: {
			control: {
				type: 'boolean',
			}
		},
		disabled: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: RadiosButtonsBasicStory): string {
	const small = args.small ? `mod-small` : '';
	const disabled = args.disabled ? `disabled` : '';
	return `
	<div class="radioButtons ${small}">
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
	`
}

const Template: Story<RadiosButtonsBasicStory> = (args: RadiosButtonsBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { small: false, disabled: false };
