import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TimePickerComponent } from '@lucca-front/ng/time';
import { Meta } from '@storybook/angular';

@Component({
	selector: 'time-picker-stories',
	templateUrl: './time-picker.stories.html',
	imports: [TimePickerComponent, FormFieldComponent, FormsModule, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TimePickerStory {
	emptyTime = null;
	filledTime = '12:30:00';
	emptyTimeControl = new FormControl(null);
	filledTimeControl = new FormControl('12:30:00');
}

export default {
	title: 'QA/TimePicker',
	component: TimePickerStory,
} as Meta;

export const Basic = {};
