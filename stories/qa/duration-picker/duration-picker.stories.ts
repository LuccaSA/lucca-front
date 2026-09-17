import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { DurationPickerComponent } from '@lucca-front/ng/time';
import { Meta } from '@storybook/angular-vite';

@Component({
	selector: 'duration-picker-stories',
	templateUrl: './duration-picker.stories.html',
	imports: [DurationPickerComponent, FormFieldComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DurationPickerStory {
	emptyDuration = null;
	filledDuration = 'PT1H';
	emptyDurationForm = null;
	filledDurationForm = 'PT1H';
	filledDuration1000h = 'PT1000H';
}

export default {
	title: 'QA/DurationPicker',
	component: DurationPickerStory,
} as Meta;

export const Basic = {};
