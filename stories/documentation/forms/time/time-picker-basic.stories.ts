import { Meta, StoryFn } from '@storybook/angular';

interface timepickerBasicStory {
	s: boolean;
	disabled: boolean;
	stepper: boolean;
	stepperHover: boolean;
	invalid: boolean;
}

export default {
	title: 'Documentation/Forms/Time/Time Picker/Basic',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		invalid: {
			control: {
				type: 'boolean',
			},
		},
		stepper: {
			control: {
				type: 'boolean',
			},
		},
		stepperHover: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: timepickerBasicStory): string {
	const disabled = args.disabled ? `disabled="disabled"` : '';
	const invalid = args.invalid ? `aria-invalid="true"` : '';
	const s = args.s ? `mod-S` : '';
	const stepperHover = args.stepperHover ? 'mod-stepperHover' : '';
	const stepper = args.stepper ? 'mod-stepper' : '';
	const stepperButtons =
		args.stepper || args.stepperHover
			? `
<button ${disabled} class="timePicker-fieldset-group-stepper" type="button" tabindex="-1" aria-hidden="true">
	<span aria-hidden="true" class="lucca-icon icon-northArrow"></span>
</button>
<button ${disabled} class="timePicker-fieldset-group-stepper" type="button" tabindex="-1" aria-hidden="true">
	<span aria-hidden="true" class="lucca-icon icon-southArrow"></span>
</button>`
			: '';
	return `
<div class="form-field ${s}">
	<label for="hour-input" class="formLabel" role="presentation">
		<span aria-hidden="true">Label</span>
	</label>
	<div class="timePicker ${stepper} ${stepperHover}">
		<fieldset class="timePicker-fieldset">
			<legend><span class="u-mask">Label</span></legend>
			<div class="timePicker-fieldset-group">
				<label class="formLabel u-mask" id="hour-label" for="hour-input">hours</label>
				<div class="timePicker-fieldset-group-textfield">
					<input ${disabled} ${invalid} type="text" inputmode="numeric" class="timePicker-fieldset-group-textfield-input" aria-labelledby="hour-label" id="hour-input" aria-describedby="helper" min="0" max="23" value="12" />
					<span aria-hidden="true" class="timePicker-fieldset-group-textfield-display">12</span>

				</div>
				${stepperButtons}
			</div>
			<div aria-hidden="true" class="timePicker-fieldset-groupSeparator">:</div>
			<div class="timePicker-fieldset-group">
				<label class="formLabel u-mask" id="minutes-label" for="minutes-input">minutes</label>
				<div class="timePicker-fieldset-group-textfield">
					<input ${disabled} ${invalid} type="text" inputmode="numeric" class="timePicker-fieldset-group-textfield-input" aria-labelledby="minutes-label" id="minutes-input" min="0" max="59" value="12" />
					<span aria-hidden="true" class="timePicker-fieldset-group-textfield-display">12</span>
				</div>
				${stepperButtons}
			</div>
		</fieldset>
	</div>
	<div class="inlineMessage" id="helper">
		<span aria-hidden="true" class="lucca-icon inlineMessage-content-statusIcon"></span>
		Helper text
	</div>
</div>
	`;
}

const Template: StoryFn<timepickerBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { s: false, disabled: false, stepper: false, stepperHover: false, invalid: false };
