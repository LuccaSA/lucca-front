import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TimePickerComponent } from '@lucca-front/ng/time';
import { Meta } from '@storybook/angular-vite';

@Component({
	selector: 'time-picker-stories',
	templateUrl: './time-picker.stories.html',
	imports: [TimePickerComponent, FormFieldComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TimePickerStory {
	emptyTime = null;
	filledTime = '12:30:00';
	emptyTimeForm = null;
	filledTimeForm = '12:30:00';
}

export default {
	title: 'QA/TimePicker',
	component: TimePickerStory,
} as Meta;

export const Basic = {};
