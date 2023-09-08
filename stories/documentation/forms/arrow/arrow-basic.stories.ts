import { Meta, Story } from '@storybook/angular';

interface ArrowBasicStory {
	s: boolean;
	label: Text;
	white: boolean;
	field: string;
	checked: boolean;
}

export default {
	title: 'Documentation/Forms/Arrow/Basic',
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
		white: {
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
	const s = args.s ? ` mod-S` : '';
	const boxWhite = args.white;
	const white = args.white ? ` mod-white` : '';
	const checked = args.checked ? ` checked` : '';

	if (args.field === 'radio') {
		return `
	<div [class.box]="${boxWhite}">
		<div class="u-displayFlex u-gapS">
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
				<div class="arrow${white}"></div>
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
				<div class="arrow${white}"></div>
			</div>
		</div>
		<div class="box u-borderRadiusM u-paddingS${white}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam! Vitae!</div>
	</div>`;
	} else if (args.field === 'checkbox') {
		return `
	<div [class.box]="${boxWhite}">
		<div class="checkboxField${s} mod-withArrow">
			<input type="checkbox" class="checkboxField-input" id="field" aria-labelledby="fieldlabel"${checked} />
			<label class="checkboxField-label" for="field">
				<span class="checkboxField-label-input">
					<span class="checkboxField-label-input-icon" aria-hidden="true"></span>
				</span>
				<span class="formLabel" id="fieldlabel">
					Label<sup *ngIf="required" class="formLabel-required" aria-hidden="true">*</sup>
				</span>
			</label>
			<div class="arrow${white}"></div>
		</div>
		<div class="box u-borderRadiusM u-paddingS${white}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam! Vitae!</div>
	</div>`;
	} else {
		return `
	<div [class.box]="${boxWhite}">
		<div class="switchField${s} mod-withArrow">
			<input type="checkbox" class="switchField-input" id="field" aria-labelledby="fieldLabel"${checked} />
			<label class="switchField-label" for="field">
				<span class="switchField-label-input">
					<span class="switchField-label-input-icon" aria-hidden="true"></span>
				</span>
				<span class="formLabel" id="fieldLabel">
					Label<sup *ngIf="required" class="formLabel-required" aria-hidden="true">*</sup>
				</span>
			</label>
			<div class="arrow${white}"></div>
		</div>
		<div class="box u-borderRadiusM u-paddingS${white}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam! Vitae!</div>
	</div>`;
	}
}

const Template: Story<ArrowBasicStory> = (args: ArrowBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { s: false, label: 'Label', white: false, field: 'radio', checked: true };
