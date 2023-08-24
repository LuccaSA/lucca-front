import { Meta, Story } from '@storybook/angular';

interface SwitchBasicStory {
	disabled: boolean;
	s: boolean;
	required: boolean;
	id: Text;
	label: Text;
	message: Text;
	checked: boolean;
	invalid: false;
	help: false;
	messageState: '';
}

export default {
	title: 'Documentation/Forms/Switch/Basic',
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

function getTemplate(args: SwitchBasicStory): string {
	const id = args.id;
	const label = args.label;
	const message = args.message;
	const s = args.s ? ` mod-S` : '';
	const disabled = args.disabled ? ` disabled="disabled"` : '';
	const checked = args.checked ? ` checked="checked"` : '';
	const required = args.required ? ` aria-required="true"` : '';
	const invalid = args.invalid ? ` aria-invalid="true"` : '';
	const help = args.help;
	const messageState = args.messageState ? ' is-' + args.messageState : '';

	return `<div class="switchField${s}">
  <input type="checkbox" class="switchField-input" id="${id}" aria-labelledby="${id}Label" aria-describedby="${id}message"${checked}${disabled}${required}${invalid} />
  <label class="switchField-label" for="${id}">
    <span class="switchField-label-input">
      <span class="switchField-label-input-icon" aria-hidden="true"></span>
    </span>
		<span class="formLabel" id="${id}Label">
			<span class="formLabel-content">
				Label<sup *ngIf="required" class="formLabel-required" aria-hidden="true">*</sup><span *ngIf="help" aria-hidden="true" class="lucca-icon icon-helpOutline"></span>
			</span>
		</span>
  </label>
	<div class="inlineMessage${messageState}" *ngIf="message" id="${id}message"><span aria-hidden="true" class="lucca-icon"></span>Helper text</div>
</div>`;
}

const Template: Story<SwitchBasicStory> = (args: SwitchBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { checked: false, s: false, disabled: false, required: false, invalid: false, help: false, messageState: '', id: 'field1', label: 'Label', message: 'Helper text' };
