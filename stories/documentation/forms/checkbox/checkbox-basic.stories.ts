import { Meta, Story } from '@storybook/angular';

interface CheckboxFieldBasicStory {
	disabled: boolean;
	s: boolean;
	required: boolean;
	id: Text;
	label: Text;
	message: Text;
	checked: boolean;
	mixed: false;
	invalid: false;
	messageState: '';
}

export default {
	title: 'Documentation/Forms/CheckboxField/Basic',
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
			options: ['', 'critical', 'warning', 'success'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: CheckboxFieldBasicStory): string {
	const id = args.id;
	const label = args.label;
	const message = args.message;
	const s = args.s ? `mod-S` : '';
	const disabled = args.disabled ? `disabled="disabled"` : '';
	const checked = args.checked ? `checked="checked"` : '';
	const required = args.required ? `aria-required="true"` : '';
	const mixed = args.mixed ? `aria-checked="mixed"` : '';
	const invalid = args.invalid ? `aria-invalid="true"` : '';
	const messageState = 'mod-' + args.messageState;

	return `
		<div class="checkboxField ${s}">
			<input type="checkbox"
				class="checkboxField-input"
				id="${id}"
				aria-labelledby="${id}label"
				aria-describedby="${id}message"
				${checked}
				${mixed}
				${disabled}
				${required}
				${invalid}
			/>
			<label class="checkboxField-label" for="${id}">
				<span class="checkboxField-label-input">
					<span class="checkboxField-label-input-icon" aria-hidden="true"></span>
				</span>
				<span class="checkboxField-label-text" id="${id}label">
					${label}<sup *ngIf="required" aria-hidden="true" class="checkboxField-label-text-required">*</sup>
				</span>
			</label>
			<div class="checkboxField-message ${messageState}" id="${id}message" *ngIf="message">
				<span class="checkboxField-message-icon" aria-hidden="true"></span>
				<span class="checkboxField-message-text">${message}</span>
			</div>
		</div>
	`;
}

const Template: Story<CheckboxFieldBasicStory> = (args: CheckboxFieldBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { s: false, disabled: false, checked: false, required: false, id: 'field1', label: 'Label', message: 'Message', mixed: false, invalid: false, messageState: '' };
