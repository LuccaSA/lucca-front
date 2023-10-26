import { Meta, Story } from '@storybook/angular';

interface RadioBasicStory {
	disabled: boolean;
	s: boolean;
	required: boolean;
	id: Text;
	label: Text;
	message: Text;
	invalid: false;
	help: false;
	messageState: '';
}

export default {
	title: 'Documentation/Forms/Radio/Basic',
	argTypes: {
		s: {
			description: 'Taille : Small',
			control: {
				type: 'boolean',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		required: {
			control: {
				type: 'boolean',
			},
		},
		invalid: {
			control: {
				type: 'boolean',
			},
		},
		help: {
			control: {
				type: 'boolean',
			},
		},
		id: {
			control: {
				type: 'text',
			},
		},
		label: {
			control: {
				type: 'text',
			},
		},
		message: {
			control: {
				type: 'text',
			},
		},
		messageState: {
			options: ['', 'error', 'warning', 'success'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: RadioBasicStory): string {
	const id = args.id;
	const label = args.label;
	const message = args.message;
	const s = args.s ? ` mod-S` : '';
	const disabled = args.disabled ? ` disabled="disabled"` : '';
	const required = args.required ? ` aria-required="true"` : '';
	const invalid = args.invalid ? ` aria-invalid="true"` : '';
	const help = args.help;
	const messageState = args.messageState ? ' is-' + args.messageState : '';

	return `
	<fieldset class="form-fieldset">
		<legend class="formLabel">Legend<sup *ngIf="required" class="formLabel-required" aria-hidden="true">*</sup><span aria-hidden="true" class="lucca-icon icon-helpOutline" *ngIf="help"></span></legend>
		<div class="form-field${s}">
			<label class="formLabel" for="${id}1">Label</label>
			<span class="radioField">
				<input type="radio" class="radioField-input" id="${id}1" name="field"${disabled}${invalid}${required} checked />
				<span class="radioField-icon">
					<span class="radioField-icon-check" aria-hidden="true"></span>
				</span>
			</span>
		</div>
		<div class="form-field${s}">
			<label class="formLabel" for="${id}2">Label</label>
			<span class="radioField">
				<input type="radio" class="radioField-input" id="${id}2" name="field"${disabled}${invalid}${required} />
				<span class="radioField-icon">
					<span class="radioField-icon-check" aria-hidden="true"></span>
				</span>
			</span>
		</div>
		<div class="inlineMessage${messageState}" id="${id}message" *ngIf="message"><span aria-hidden="true" class="lucca-icon"></span>${message}</div>
	</fieldset>`;
}

const Template: Story<RadioBasicStory> = (args: RadioBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { s: false, disabled: false, required: false, invalid: false, help: false, messageState: '', id: 'field1', label: 'Label', message: 'Helper text', };
