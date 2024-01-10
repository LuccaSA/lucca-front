import { Meta, Story } from '@storybook/angular';

interface ArrowBasicStory {
	s: boolean;
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
	const s = args.s ? ' mod-S' : '';
	const grey = args.grey ? ' mod-grey' : ' ';
	const checked = args.checked ? ' checked' : '';

	if (args.field === 'radio') {
		return `<div class="u-displayFlex u-gapS">
	<div class="form-field mod-withArrow${s}">
	  <label class="formLabel" for="IDradioA">Label A</label>
	  <span class="radioField">
	    <input
	      type="radio"
	      class="radioField-input"
	      id="IDradioA"
	      name="radioName1"
	      aria-describedby="IDmessageRadioA"
	      checked
	    />
	    <span class="radioField-icon" aria-hidden="true">
	      <span class="radioField-icon-check"></span>
	    </span>
	  </span>
	  <div class="form-field-arrow${grey}"></div>
	</div>
	<div class="form-field mod-withArrow${s}">
	  <label class="formLabel" for="IDradioB">Label B</label>
	  <span class="radioField">
	    <input
	      type="radio"
	      class="radioField-input"
	      id="IDradioB"
	      name="radioName1"
	      aria-describedby="IDmessageRadioB"
	    />
	    <span class="radioField-icon" aria-hidden="true">
	      <span class="radioField-icon-check"></span>
	    </span>
	  </span>
	  <div class="form-field-arrow${grey}"></div>
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
Basic.args = { s: false, grey: true, field: 'radio', checked: true };
