import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TimePickerRangeComponent } from '@lucca-front/ng/time';
import { Meta } from '@storybook/angular';

@Component({
	selector: 'time-picker-range-stories',
	templateUrl: './time-picker-range.stories.html',
	imports: [TimePickerRangeComponent, FormFieldComponent, FormsModule, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TimePickerRangeStory {
	emptyRange = {};
	filledRange = { start: '12:30:00', end: '14:30:00' };
	emptyRangeControl = new FormControl(null);
	filledRangeControl = new FormControl({ start: '12:30:00', end: '14:30:00' });
	filledRangeStartOnlyControl = new FormControl({ start: '12:30:00', end: null });
	filledRangeEndOnlyControl = new FormControl({ start: null, end: '14:30:00' });
}

export default {
	title: 'QA/TimePickerRange',
	component: TimePickerRangeStory,
} as Meta;

export const Basic = {};
