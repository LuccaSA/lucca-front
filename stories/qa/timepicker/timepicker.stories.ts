import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TimePickerComponent } from '@lucca-front/ng/time';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'timepicker-stories',
	templateUrl: './timepicker.stories.html',
	imports: [TimePickerComponent, FormFieldComponent, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TimepickerStory {
	filledTime = '12:30:00';
}

export default {
	title: 'QA/Timepicker',
	component: TimepickerStory,
} as Meta;

export const Basic: StoryObj<TimepickerStory> = {
	args: {},
};
