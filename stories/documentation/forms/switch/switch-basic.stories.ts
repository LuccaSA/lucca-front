import { Meta, StoryFn } from '@storybook/angular';

interface SwitchBasicStory {
	disabled: boolean;
	s: boolean;
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
	const invalid = args.invalid ? ` aria-invalid="true"` : '';
	const help = args.help;
	const messageState = args.messageState ? ' is-' + args.messageState : '';

	return `<div class="form-field${s}">
	<label class="formLabel" for="${id}">
		Label<span *ngIf="help" class="formLabel-info"><span aria-hidden="true" class="lucca-icon icon-signHelp"></span><span class="u-mask">?</span></span>
	</label>
	<span class="switchField">
		<input type="checkbox" class="switchField-input" id="${id}" aria-describedby="${id}message"${checked}${disabled}${invalid} />
		<span class="switchField-icon" aria-hidden="true"><span class="switchField-icon-check"></span></span>
	</span>
	<div class="inlineMessage ${messageState}" id="${id}message" *ngIf="message">
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>`;
}

const Template: StoryFn<SwitchBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { checked: false, s: false, disabled: false, invalid: false, help: false, messageState: '', id: 'field1', label: 'Label', message: 'Helper text' };
