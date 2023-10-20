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
		return `<div class="checkboxField${s} mod-withArrow">
	<input type="checkbox" class="checkboxField-input" id="field" aria-labelledby="fieldlabel"${checked} />
	<label class="checkboxField-label" for="field">
		<span class="checkboxField-label-input">
			<span class="checkboxField-label-input-icon" aria-hidden="true"></span>
		</span>
		<span class="formLabel" id="fieldlabel">
			Label<sup *ngIf="required" class="formLabel-required" aria-hidden="true">*</sup>
		</span>
	</label>
	<div class="checkboxField-arrow${grey}"></div>
</div>
<div class="box mod-withArrow${grey}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam! Vitae!</div>`;
	} else {
		return `<div class="switchField${s} mod-withArrow">
	<input type="checkbox" class="switchField-input" id="field" aria-labelledby="fieldLabel"${checked} />
	<label class="switchField-label" for="field">
		<span class="switchField-label-input">
			<span class="switchField-label-input-icon" aria-hidden="true"></span>
		</span>
		<span class="formLabel" id="fieldLabel">
			Label<sup *ngIf="required" class="formLabel-required" aria-hidden="true">*</sup>
		</span>
	</label>
	<div class="switchField-arrow${grey}"></div>
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
