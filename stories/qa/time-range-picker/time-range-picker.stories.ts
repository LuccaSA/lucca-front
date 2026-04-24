import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TimeRangePickerComponent } from '@lucca-front/ng/time';
import { Meta } from '@storybook/angular';

@Component({
	selector: 'time-range-picker-stories',
	templateUrl: './time-range-picker.stories.html',
	imports: [TimeRangePickerComponent, FormFieldComponent, FormsModule, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TimeRangePickerStory {
	emptyRange = {};
	filledRange = { start: '12:30:00', end: '14:30:00' };
	emptyRangeControl = new FormControl(null);
	filledRangeControl = new FormControl({ start: '12:30:00', end: '14:30:00' });
	filledRangeStartOnlyControl = new FormControl({ start: '12:30:00', end: null });
	filledRangeEndOnlyControl = new FormControl({ start: null, end: '14:30:00' });
}

export default {
	title: 'QA/TimeRangePicker',
	component: TimeRangePickerStory,
} as Meta;

export const Basic = {};
