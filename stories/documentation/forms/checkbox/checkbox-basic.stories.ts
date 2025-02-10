import { Meta, StoryFn } from '@storybook/angular';

interface CheckboxBasicStory {
	disabled: boolean;
	s: boolean;
	required: boolean;
	id: Text;
	label: Text;
	message: Text;
	checked: boolean;
	mixed: false;
	invalid: false;
	help: false;
	messageState: '';
}

export default {
	title: 'Documentation/Forms/Checkbox/Basic',
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
		checked: {
			control: {
				type: 'boolean',
			},
		},
		required: {
			control: {
				type: 'boolean',
			},
		},
		mixed: {
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

function getTemplate(args: CheckboxBasicStory): string {
	const id = args.id;
	const label = args.label;
	const message = args.message;
	const s = args.s ? ` mod-S` : '';
	const disabled = args.disabled ? ` disabled="disabled"` : '';
	const checked = args.checked ? ` checked="checked"` : '';
	const required = args.required ? ` aria-required="true"` : '';
	const mixed = args.mixed ? ` aria-checked="mixed"` : '';
	const invalid = args.invalid ? ` aria-invalid="true"` : '';
	const help = args.help;
	const messageState = args.messageState ? ' is-' + args.messageState : '';

	return `<div class="form-field${s} pr-u-marginBlockEnd200">
	<label class="formLabel" for="${id}">
		Label<sup class="formLabel-required" *ngIf="required" aria-hidden="true">*</sup><span *ngIf="help" class="formLabel-info"><span aria-hidden="true" class="lucca-icon icon-signHelp"></span><span class="u-mask">?</span></span>
	</label>
	<span class="checkboxField">
		<input type="checkbox" class="checkboxField-input" id="${id}" aria-labelledby="${id}label" aria-describedby="${id}message"${checked}${mixed}${disabled}${required}${invalid} />
		<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
	</span>
	<div class="inlineMessage ${messageState}" id="${id}message" *ngIf="message">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">
			${message}
		</p>
	</div>
</div>`;
}

const Template: StoryFn<CheckboxBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { checked: false, s: false, disabled: false, required: false, mixed: false, invalid: false, help: false, messageState: '', id: 'field1', label: 'Label', message: 'Helper text' };
