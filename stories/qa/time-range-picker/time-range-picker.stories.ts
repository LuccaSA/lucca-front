import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TimeRangePickerComponent } from '@lucca-front/ng/time';
import { Meta } from '@storybook/angular-vite';

@Component({
	selector: 'time-range-picker-stories',
	templateUrl: './time-range-picker.stories.html',
	imports: [TimeRangePickerComponent, FormFieldComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TimeRangePickerStory {
	emptyRange = {};
	filledRange = { start: '12:30:00', end: '14:30:00' };
	emptyRangeForm = null;
	filledRangeForm = { start: '12:30:00', end: '14:30:00' };
	filledRangeStartOnly = { start: '12:30:00', end: null };
	filledRangeEndOnly = { start: null, end: '14:30:00' };
}

export default {
	title: 'QA/TimeRangePicker',
	component: TimeRangePickerStory,
} as Meta;

export const Basic = {};
