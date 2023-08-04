import { Meta, Story } from '@storybook/angular';

interface TextfieldBasicStory {
	disabled: boolean;
	size: string;
	required: boolean;
	id: Text;
	label: Text;
	message: Text;
	invalid: false;
	help: false;
	clear: false;
	messageState: '';
}

export default {
	title: 'Documentation/Forms/Textfield/Basic',
	argTypes: {
		size: {
			options: ['', 'mod-S', 'mod-XS'],
			control: {
				type: 'select',
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
		clear: {
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

function getTemplate(args: TextfieldBasicStory): string {
	const id = args.id;
	const label = args.label;
	const message = args.message;
	const size = args.size;
	const disabled = args.disabled ? `disabled="disabled"` : '';
	const required = args.required ? `aria-required="true"` : '';
	const invalid = args.invalid ? `aria-invalid="true"` : '';
	const help = args.help;
	const clear = args.help;
	const messageState = 'is-' + args.messageState;

	return `
	<div class="textField ${size}">
		<input type="text" id="${id}" class="textField-input" aria-labelledby="${id}prefix ${id}label ${id}suffix" aria-describedby="${id}message" placeholder="Placeholder" aria-invalid="false" value="Value" ${disabled} ${required} ${invalid} />
		<label for="${id}" class="textField-label">
			<div class="textField-label-input"></div>
			<span class="textField-label-prefix" id="${id}label">
				<span class="textField-label-prefix-item">$</span>
			</span>
			<span class="formLabel" id="${id}label">
				Label<sup *ngIf="required" class="formLabel-required" aria-hidden="true">*</sup><span *ngIf="help" aria-hidden="true" class="lucca-icon icon-helpOutline"></span>
			</span>
			<span class="textField-label-suffix" id="${id}suffix">
				<span class="textField-label-suffix-item" aria-label="euros par jour">€/j</span>
			</span>
		</label>
		<div class="textField-action" *ngIf="clear">
			<button class="clear">
				<span aria-hidden="true" class="lucca-icon icon-close"></span>
				<span class="u-mask">Vider ce champ</span>
			</button>
		</div>
		<div class="inlineMessage ${messageState}" id="${id}message" *ngIf="message"><span aria-hidden="true" class="lucca-icon"></span>${message}</div>
	</div>
	`;
}

const Template: Story<TextfieldBasicStory> = (args: TextfieldBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { size: '', disabled: false, required: false, invalid: false, help: false, clear: false, messageState: '', id: 'fieldID', label: 'Label', message: 'Helper text', };
