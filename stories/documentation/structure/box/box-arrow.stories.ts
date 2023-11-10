import { Meta, Story } from '@storybook/angular';

interface ArrowBasicStory {
	s: boolean;
	label: Text;
	grey: boolean;
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
		label: {
			control: {
				type: 'text',
			},
		},
		grey: {
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
	const label = args.label;
	const s = args.s ? ' mod-S' : '';
	const grey = args.grey ? ' mod-grey' : ' ';
	const checked = args.checked ? ' checked' : '';

	if (args.field === 'radio') {
		return `<div class="u-displayFlex u-gapS">
	<div class="radioField${s} mod-withArrow">
		<input type="radio" class="radioField-input" id="fieldA" name="field" aria-labelledby="fieldALabel"${checked} />
		<label class="radioField-label" for="fieldA">
			<span class="radioField-label-input">
				<span class="radioField-label-input-icon" aria-hidden="true"></span>
			</span>
			<span class="formLabel" id="fieldAlabel">
				${label}
			</span>
		</label>
		<div class="radioField-arrow${grey}"></div>
	</div>
	<div class="radioField${s} mod-withArrow">
		<input type="radio" class="radioField-input" id="fieldB" name="field" aria-labelledby="fieldBLabel" />
		<label class="radioField-label" for="fieldB">
			<span class="radioField-label-input">
				<span class="radioField-label-input-icon" aria-hidden="true"></span>
			</span>
			<span class="formLabel" id="fieldBlabel">
				Label
			</span>
		</label>
		<div class="radioField-arrow${grey}"></div>
	</div>
</div>
<div class="box mod-withArrow${grey}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam! Vitae!</div>`;
	} else if (args.field === 'checkbox') {
		return `<div class="form-field mod-withArrow${s}">
	<label class="formLabel" for="CB">Label</label>
	<span class="checkboxField">
		<input type="checkbox" class="checkboxField-input" id="CB" aria-labelledby="CB-label"${checked} />
		<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
	</span>
	<div class="form-field-arrow${grey}"></div>
</div>
<div class="box mod-withArrow${grey}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam! Vitae!</div>`;
	} else {
		return `<div class="form-field mod-withArrow${s}">
	<label class="formLabel" for="ID">Label</label>
	<span class="switchField">
		<input type="checkbox" class="switchField-input" id="ID"${checked} />
		<span class="switchField-icon" aria-hidden="true"><span class="switchField-icon-check"></span></span>
	</span>
	<div class="form-field-arrow${grey}"></div>
</div>
<div class="box mod-withArrow${grey}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam! Vitae!</div>`;
	}
}

const Template: Story<ArrowBasicStory> = (args: ArrowBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { s: false, label: 'Label', grey: true, field: 'radio', checked: true };
