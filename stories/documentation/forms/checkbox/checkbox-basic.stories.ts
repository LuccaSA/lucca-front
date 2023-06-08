import { Meta, Story } from '@storybook/angular';

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
	messageState: '';
}

export default {
	title: 'Documentation/Forms/Checkboxes/Basic',
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

function getTemplate(args: CheckboxBasicStory): string {
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
		<div class="checkbox ${s}">
			<input type="checkbox"
				class="checkbox-input"
				id="${id}"
				aria-labelledby="${id}label"
				aria-describedby="${id}message"
				${checked}
				${mixed}
				${disabled}
				${required}
				${invalid}
			/>
			<label class="checkbox-label" for="${id}">
				<span class="checkbox-label-input">
					<span class="checkbox-label-input-icon" aria-hidden="true"></span>
				</span>
				<span class="checkbox-label-text" id="${id}label">
					${label}<sup *ngIf="required" aria-hidden="true" class="checkbox-label-text-required">*</sup>
				</span>
			</label>
			<div class="checkbox-message ${messageState}" id="${id}message" *ngIf="message">
				<span class="checkbox-message-icon" aria-hidden="true"></span>
				<span class="checkbox-message-text">${message}</span>
			</div>
		</div>
	`;
}

const Template: Story<CheckboxBasicStory> = (args: CheckboxBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { s: false, disabled: false, checked: false, required: false, id: 'field1', label: 'Label', message: 'Message', mixed: false, invalid: false, messageState: '' };
