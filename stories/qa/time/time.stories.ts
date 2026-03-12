import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { Meta } from '@storybook/angular';
import { DurationPickerComponent, TimePickerComponent } from '@lucca-front/ng/time';

@Component({
	selector: 'time-stories',
	templateUrl: './time.stories.html',
	imports: [DurationPickerComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, TimePickerComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TimeStory {
	emptyDuration = null;
	filledDuration = 'PT1H';
	emptyDurationControl = new FormControl(null);
	filledDurationControl = new FormControl('PT1H');
	filledDuration1000hControl = new FormControl('PT1000H');
	emptyTime = null;
	filledTime = '12:30:00';
	emptyTimeControl = new FormControl(null);
	filledTimeControl = new FormControl('12:30:00');
}

export default {
	title: 'QA/Time',
	component: TimeStory,
} as Meta;

export const Basic = {};
