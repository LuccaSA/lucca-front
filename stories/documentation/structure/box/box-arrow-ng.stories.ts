import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { FormFieldComponent } from '../../../../packages/ng/form-field/form-field.component';
import { RadioGroupInputComponent } from '../../../../packages/ng/forms/radio-group-input/radio-group-input.component';
import { RadioComponent } from '../../../../packages/ng/forms/radio-group-input/radio/radio.component';

interface ArrowBasicStory {
	s: boolean;
	neutral: boolean;
	field: string;
	checked: boolean;
}

export default {
	title: 'Documentation/Structure/Box/Arrow/Angular',
	decorators: [
		moduleMetadata({
			imports: [RadioGroupInputComponent, RadioComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
		}),
	],
	argTypes: {
		checked: {
			control: {
				type: 'boolean',
			},
		},
		s: {
			description: 'Taille : Small',
			control: {
				type: 'boolean',
			},
		},
		neutral: {
			control: {
				type: 'boolean',
			},
		},
		field: {
			description: 'field',
			options: ['radio', 'checkbox', 'switch'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: ArrowBasicStory): string {
	const s = args.s ? ' mod-S' : '';
	const neutral = args.neutral ? ' mod-neutral' : ' ';
	const checked = args.checked ? ' checked' : '';

	if (args.field === 'radio') {
		return `<lu-form-field>
	<lu-radio-group-input [(ngModel)]="example" arrow="neutral">
		<lu-radio [value]="1">Option A</lu-radio>
		<lu-radio [value]="2">Option B</lu-radio>
		<lu-radio [value]="3">Option C</lu-radio>
	</lu-radio-group-input>
</lu-form-field>
<div class="box mod-withArrow${neutral}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam! Vitae!</div>`;
	} else if (args.field === 'checkbox') {
		return `<div class="form-field mod-withArrow${s}">
	<label class="formLabel" for="CB">Label</label>
	<span class="checkboxField">
		<input type="checkbox" class="checkboxField-input" id="CB" aria-labelledby="CB-label"${checked} />
		<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
	</span>
	<div class="form-field-arrow${neutral}"></div>
</div>
<div class="box mod-withArrow${neutral}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam! Vitae!</div>`;
	} else {
		return `<div class="form-field mod-withArrow${s}">
	<label class="formLabel" for="ID">Label</label>
	<span class="switchField">
		<input type="checkbox" class="switchField-input" id="ID"${checked} />
		<span class="switchField-icon" aria-hidden="true"><span class="switchField-icon-check"></span></span>
	</span>
	<div class="form-field-arrow${neutral}"></div>
</div>
<div class="box mod-withArrow${neutral}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam! Vitae!</div>`;
	}
}

const Template: StoryFn<ArrowBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}`,
		args.neutral === true ? ':host { background-color: var(--palettes-neutral-0); margin: -15px -15px; padding: 15px 15px; }' : '',
	],
});

export const Basic = Template.bind({});
Basic.args = { s: false, neutral: true, field: 'radio', checked: true };
