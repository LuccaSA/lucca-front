import { Meta, StoryObj } from '@storybook/angular';

interface timepickerBasicStory {
	s: boolean;
	disabled: boolean;
	stepper: boolean;
	stepperHover: boolean;
	invalid: boolean;
}

export default {
	title: 'Documentation/Forms/Time/HTML & CSS/Range',
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
			if: { arg: 'stepper', truthy: true },
		},
	},
} as Meta;

function getTemplate(args: timepickerBasicStory): string {
	const disabled = args.disabled ? ` disabled="disabled"` : ``;
	const invalid = args.invalid ? ` aria-invalid="true"` : ``;
	const s = args.s ? ` mod-S` : ``;
	const stepperHover = args.stepperHover ? ` mod-stepperHover` : ``;
	const stepper = args.stepper ? ` mod-stepper` : ``;
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
<div class="form-field${s}">
	<label for="start-hour-input" class="formLabel" role="presentation">
		<span aria-hidden="true">Label</span>
	</label>
	<div class="timePicker${stepper}${stepperHover}">
		<div class="timePicker-fieldset">
			<div class="timePicker">
				<fieldset class="timePicker-fieldset">
					<legend><span class="pr-u-mask">Label (start)</span></legend>
					<div class="timePicker-fieldset-group">
						<label class="formLabel pr-u-mask" id="start-hour-label" for="start-hour-input">Hours</label>
						<div class="timePicker-fieldset-group-textfield">
							<input${disabled}${invalid} type="text" autocomplete="off" inputmode="numeric" class="timePicker-fieldset-group-textfield-input" aria-labelledby="start-hour-label" id="start-hour-input" aria-describedby="helper" min="0" max="23" value="12" />
							<span aria-hidden="true" class="timePicker-fieldset-group-textfield-display" data-content-before="12"></span>
						</div>${stepperButtons}
					</div>
					<div aria-hidden="true" class="timePicker-fieldset-groupSeparator" data-content-before=":"></div>
					<div class="timePicker-fieldset-group">
						<label class="formLabel pr-u-mask" id="start-minutes-label" for="start-minutes-input">Minutes</label>
						<div class="timePicker-fieldset-group-textfield">
							<input${disabled}${invalid} type="text" autocomplete="off" inputmode="numeric" class="timePicker-fieldset-group-textfield-input" aria-labelledby="start-minutes-label" id="start-minutes-input" min="0" max="59" value="12" />
							<span aria-hidden="true" class="timePicker-fieldset-group-textfield-display" data-content-before="12"></span>
						</div>${stepperButtons}
					</div>
				</fieldset>
			</div>
			<label role="presentation" for="end-hour-input" class="timePicker-arrow">
				<span class="timePicker-arrow-icon">
					<span aria-hidden="true" class="lucca-icon icon-arrowRight"></span>
				</span>
			</label>
			<div class="timePicker">
				<fieldset class="timePicker-fieldset">
					<legend><span class="pr-u-mask">Label (end)</span></legend>
					<div class="timePicker-fieldset-group">
						<label class="formLabel pr-u-mask" id="end-hour-label" for="end-hour-input">Hours</label>
						<div class="timePicker-fieldset-group-textfield">
							<input${disabled}${invalid} type="text" autocomplete="off" inputmode="numeric" class="timePicker-fieldset-group-textfield-input" aria-labelledby="end-hour-label" id="end-hour-input" min="0" max="23" value="12" />
							<span aria-hidden="true" class="timePicker-fieldset-group-textfield-display" data-content-before="12"></span>
						</div>${stepperButtons}
					</div>
					<div aria-hidden="true" class="timePicker-fieldset-groupSeparator" data-content-before=":"></div>
					<div class="timePicker-fieldset-group">
						<label class="formLabel pr-u-mask" id="end-minutes-label" for="end-minutes-input">Minutes</label>
						<div class="timePicker-fieldset-group-textfield">
							<input${disabled}${invalid} type="text" autocomplete="off" inputmode="numeric" class="timePicker-fieldset-group-textfield-input" aria-labelledby="end-minutes-label" id="end-minutes-input" min="0" max="59" value="12" />
							<span aria-hidden="true" class="timePicker-fieldset-group-textfield-display" data-content-before="12"></span>
						</div>${stepperButtons}
					</div>
				</fieldset>
			</div>
		</div>
	</div>
	<div class="inlineMessage" id="helper">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">
			Helper text
		</p>
	</div>
</div>
	`;
}

const Template = (args: timepickerBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<timepickerBasicStory> = {
	args: { s: false, disabled: false, stepper: false, stepperHover: false, invalid: false },
	render: Template,
};
