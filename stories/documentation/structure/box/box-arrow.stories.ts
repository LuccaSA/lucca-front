import { Meta, StoryFn } from '@storybook/angular';

interface ArrowBasicStory {
	s: boolean;
	neutral: boolean;
	field: string;
	checked: boolean;
}

export default {
	title: 'Documentation/Structure/Box/Arrow',
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
		return `<fieldset class="form-fieldset mod-inline">
	<legend class="formLabel u-mask">
		Label
		<sup class="formLabel-required" aria-hidden="true">*</sup>
	</legend>
	<div class="form-field mod-withArrow${s}">
	<label class="formLabel" for="IDradioA">Label A</label>
	<span class="radioField">
		<input
		type="radio"
		class="radioField-input"
		id="IDradioA"
		name="radioName2"
		aria-describedby="IDmessageRadioA"
		checked
		/>
		<span class="radioField-icon" aria-hidden="true">
		<span class="radioField-icon-check"></span>
		</span>
	</span>
	<div class="form-field-arrow${neutral}"></div>
	</div>
	<div class="form-field mod-withArrow${s}">
	<label class="formLabel" for="IDradioB">Label B</label>
	<span class="radioField">
		<input
		type="radio"
		class="radioField-input"
		id="IDradioB"
		name="radioName2"
		aria-describedby="IDmessageRadioB"
		/>
		<span class="radioField-icon" aria-hidden="true">
		<span class="radioField-icon-check"></span>
		</span>
	</span>
	<div class="form-field-arrow${neutral}"></div>
	</div>
</fieldset>
	<div class="box mod-withArrow${neutral}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam! Vitae!</div>
`;
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
	styles: [args.neutral === true ? ':host { background-color: var(--palettes-neutral-0); margin: -15px -15px; padding: 15px 15px; }' : ''],
});

export const Basic = Template.bind({});
Basic.args = { s: false, neutral: true, field: 'radio', checked: true };
