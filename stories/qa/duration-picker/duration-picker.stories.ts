import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { DurationPickerComponent } from '@lucca-front/ng/time';
import { Meta } from '@storybook/angular';

@Component({
	selector: 'duration-picker-stories',
	templateUrl: './duration-picker.stories.html',
	imports: [DurationPickerComponent, FormFieldComponent, FormsModule, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DurationPickerStory {
	emptyDuration = null;
	filledDuration = 'PT1H';
	emptyDurationControl = new FormControl(null);
	filledDurationControl = new FormControl('PT1H');
	filledDuration1000hControl = new FormControl('PT1000H');
}

export default {
	title: 'QA/DurationPicker',
	component: DurationPickerStory,
} as Meta;

export const Basic = {};
