import { Meta, Story } from '@storybook/angular';

interface TextfieldBasicStory {
	disabled: boolean;
	size: string;
	required: boolean;
	id: string;
	label: string;
	message: string;
	invalid: false;
	help: boolean;
	clear: boolean;
	messageState: '';
	counter: boolean;
	value: string;
	maxlength: number;
	maxlengthAttribute: boolean;
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
		value: {
			control: {
				type: 'text',
			},
		},
		maxlength: {
			control: {
				type: 'number',
				min: 1,
			},
		},
		maxlengthAttribute: {
			control: {
				type: 'boolean',
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
	const size = args.size ? ' ' + args.size : '';
	const disabled = args.disabled ? ` disabled="disabled"` : '';
	const required = args.required ? ` aria-required="true"` : '';
	const invalid = args.invalid ? ` aria-invalid="true"` : '';
	const maxlengthAttribute = args.maxlengthAttribute ? ` maxlength="${args.maxlength}"` : '';
	const maxlength = args.maxlength;
	const help = args.help ? `<span *ngIf="help" aria-hidden="true" class="lucca-icon icon-helpOutline"></span>` : ``;
	const clear = args.clear;
	const value = args.value;
	const messageState = args.messageState ? ' is-' + args.messageState : '';
	const counter = args.counter
		? `<span class="formLabel-counter">
				<span class="formLabel-counter-display" aria-hidden="true">${value.length}/${maxlength}</span>
				<span class="formLabel-counter-alternative">
					Le texte fait ${value.length} ${value.length > 1 ? 'caractères de long.' : 'caractère de long.'}
					${maxlength} ${maxlength > 1 ? 'caractères sont autorisés.' : 'caractère est autorisé.'}
				</span>
			</span>`
		: ``;

	return `<div class="textField${size}">
	<input type="text" id="${id}" class="textField-input" aria-labelledby="${id}label ${id}prefix ${id}suffix" aria-describedby="${id}message" placeholder="Placeholder" aria-invalid="false" value="${value}"${disabled}${required}${invalid}${maxlengthAttribute} />
	<label for="${id}" class="textField-label">
		<span class="textField-label-input"></span>
		<span class="textField-label-prefix" id="${id}prefix">
			<span class="textField-label-prefix-item">$</span>
		</span>
		<span class="formLabel" id="${id}label">
			<span class="formLabel-content">
				Label<sup *ngIf="required" class="formLabel-required" aria-hidden="true">*</sup>
				${help}
			</span>
			${counter}
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
	<div class="inlineMessage${messageState}" id="${id}message" *ngIf="message"><span aria-hidden="true" class="lucca-icon"></span>${message}</div>
</div>`;
}

const Template: Story<TextfieldBasicStory> = (args: TextfieldBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	size: '',
	disabled: false,
	required: false,
	invalid: false,
	help: false,
	clear: false,
	messageState: '',
	id: 'fieldID',
	label: 'Label',
	message: 'Helper text',
	counter: false,
	value: 'Value',
	maxlength: 20,
	maxlengthAttribute: false,
};
